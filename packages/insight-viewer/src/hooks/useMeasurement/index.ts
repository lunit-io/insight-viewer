import { useState, useEffect } from 'react'
import { Measurement, MeasurementBase } from '../../types'
import { RULER_MIN_LENGTH, CIRCLE_MIN_RADIUS } from '../../const'

function validateDataAttrs(dataAttrs?: { [attr: string]: string }) {
  if (!dataAttrs) return

  Object.keys(dataAttrs).forEach(attr => {
    if (!/^data-/.test(attr)) {
      throw new Error(`Measurement.dataAttrs 속성은 data-* 형태의 이름으로 입력되어야 합니다 (${attr})`)
    }
  })
}

interface UseMeasurementProps {
  nextId?: number
  initalMeasurement?: Measurement[]
}

interface MeasurementDrawingState {
  measurements: Measurement[]
  hoveredMeasurement: Measurement | null
  selectedMeasurement: Measurement | null
  addMeasurement: (measurement: Measurement, measurementInfo?: Pick<Measurement, 'dataAttrs'>) => Measurement | null
  hoverMeasurement: (measurement: Measurement | null) => void
  selectMeasurement: (measurement: Measurement | null) => void
  updateMeasurement: (measurement: Measurement, patch: Partial<Omit<MeasurementBase, 'id' | 'type'>>) => void
  removeMeasurement: (measurement: Measurement) => void
  removeAllMeasurement: () => void
}

export function useMeasurement({ nextId, initalMeasurement }: UseMeasurementProps): MeasurementDrawingState {
  const [measurements, setMeasurements] = useState<Measurement[]>([])
  const [hoveredMeasurement, setHoveredMeasurement] = useState<Measurement | null>(null)
  const [selectedMeasurement, setSelectedMeasurement] = useState<Measurement | null>(null)

  useEffect(() => {
    setMeasurements(() =>
      initalMeasurement
        ? initalMeasurement.map<Measurement>(
            (addedMeasurement, i) =>
              ({
                ...addedMeasurement,
                id: nextId ?? i,
              } as Measurement)
          )
        : []
    )
  }, [initalMeasurement, nextId])

  const addMeasurement = (
    measurement: Measurement,
    measurementInfo: Pick<Measurement, 'dataAttrs'> | undefined
  ): Measurement | null => {
    if (
      measurement.type === 'ruler' &&
      (measurement.length === 0 || (measurement.length && measurement.length < RULER_MIN_LENGTH))
    )
      return null
    if (measurement.type === 'circle' && measurement.radius < CIRCLE_MIN_RADIUS) return null
    if (measurementInfo?.dataAttrs) {
      validateDataAttrs(measurementInfo?.dataAttrs)
    }

    setMeasurements(prevMeasurements => [...prevMeasurements, measurement])

    return measurement
  }

  const hoverMeasurement = (measurement: Measurement | null) => {
    setHoveredMeasurement(prevHoveredMeasurement =>
      measurement !== prevHoveredMeasurement ? measurement : prevHoveredMeasurement
    )
  }

  const removeMeasurement = (measurement: Measurement) => {
    setMeasurements(prevMeasurements => {
      const index = prevMeasurements.findIndex(({ id }) => id === measurement.id)

      if (index > -1) {
        const nextMeasurements = [...prevMeasurements]
        nextMeasurements.splice(index, 1)

        return nextMeasurements
      }

      return prevMeasurements
    })

    setSelectedMeasurement(null)
  }

  const selectMeasurement = (measurement: Measurement | null) => {
    if (measurement) removeMeasurement(measurement)

    setSelectedMeasurement(prevSelectedMeasurement =>
      measurement !== prevSelectedMeasurement ? measurement : prevSelectedMeasurement
    )
  }

  const updateMeasurement = (measurement: Measurement, patch: Partial<Omit<MeasurementBase, 'id' | 'type'>>) => {
    if (patch.dataAttrs) {
      validateDataAttrs(patch.dataAttrs)
    }

    const nextMeasurement: Measurement = {
      ...measurement,
      ...patch,
      id: measurement.id,
    }

    setMeasurements(prevMeasurements => {
      const nextMeasurements = [...prevMeasurements]
      const index: number = nextMeasurements.findIndex(({ id }) => nextMeasurement.id === id)

      if (index > -1) {
        nextMeasurements[index] = nextMeasurement

        setSelectedMeasurement(prevSelectedMeasurement =>
          measurement === prevSelectedMeasurement ? nextMeasurement : prevSelectedMeasurement
        )
      }

      return nextMeasurements
    })

    return nextMeasurement
  }

  const removeAllMeasurement = () => {
    setMeasurements([])
    setSelectedMeasurement(null)
  }

  return {
    measurements,
    hoveredMeasurement,
    selectedMeasurement,
    addMeasurement,
    hoverMeasurement,
    removeMeasurement,
    updateMeasurement,
    selectMeasurement,
    removeAllMeasurement,
  }
}
