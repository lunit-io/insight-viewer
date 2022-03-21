import { useState, useEffect } from 'react'
import polylabel from 'polylabel'
import { MeasurementMode, Measurement, MeasurementBase } from '../../types'

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
  mode?: MeasurementMode
}

interface MeasurementDrawingState {
  measurements: Measurement[]
  selectedMeasurement: Measurement | null
  addMeasurement: (measurement: Measurement, measurementInfo?: Pick<Measurement, 'dataAttrs'>) => Measurement | null
  selectMeasurement: (measurement: Measurement | null) => void
  updateMeasurement: (measurement: Measurement, patch: Partial<Omit<MeasurementBase, 'id' | 'type'>>) => void
  removeMeasurement: (measurement: Measurement) => void
  removeAllMeasurement: () => void
}

export function useMeasurement({
  nextId,
  initalMeasurement,
  mode = 'ruler',
}: UseMeasurementProps): MeasurementDrawingState {
  const [measurements, setMeasurements] = useState<Measurement[]>([])
  const [selectedMeasurement, setSelectedMeasurement] = useState<Measurement | null>(null)

  useEffect(() => {
    setMeasurements(() =>
      initalMeasurement
        ? initalMeasurement.map<Measurement>((addedMeasurement, i) => {
            const annotiaotnLabelPoints =
              addedMeasurement.type === 'circle' ? [addedMeasurement.center] : addedMeasurement.points

            return {
              ...addedMeasurement,
              id: nextId ?? i,
              labelPosition: polylabel([annotiaotnLabelPoints], 1),
            } as Measurement
          })
        : []
    )
  }, [initalMeasurement, nextId])

  const addMeasurement = (
    measurement: Measurement,
    measurementInfo: Pick<Measurement, 'dataAttrs'> | undefined
  ): Measurement | null => {
    if (measurement.type !== mode) throw Error('The mode of component and hook is different')
    if (measurement.type === 'ruler' && measurement.length && measurement.length < 2) return null
    if (measurementInfo?.dataAttrs) {
      validateDataAttrs(measurementInfo?.dataAttrs)
    }

    setMeasurements(prevMeasurements => [...prevMeasurements, measurement])

    return measurement
  }

  const selectMeasurement = (measurement: Measurement | null) => {
    setSelectedMeasurement(prevSelectedMeasurement =>
      measurement !== prevSelectedMeasurement ? measurement : prevSelectedMeasurement
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
    selectedMeasurement,
    addMeasurement,
    removeMeasurement,
    updateMeasurement,
    selectMeasurement,
    removeAllMeasurement,
  }
}
