import { useState, useEffect } from 'react'

import type { Measurement, MeasurementBase } from '../../types'
import type { UseMeasurementParams, MeasurementDrawingState } from './types'
import { isSamePoints } from '../../utils/common/isSamePoints'

function validateDataAttrs(dataAttrs?: { [attr: string]: string }) {
  if (!dataAttrs) return

  Object.keys(dataAttrs).forEach((attr) => {
    if (!/^data-/.test(attr)) {
      throw new Error(`Measurement.dataAttrs 속성은 data-* 형태의 이름으로 입력되어야 합니다 (${attr})`)
    }
  })
}

export function useMeasurement({ nextId, initialMeasurement }: UseMeasurementParams): MeasurementDrawingState {
  const [measurements, setMeasurements] = useState<Measurement[]>([])
  const [hoveredMeasurement, setHoveredMeasurement] = useState<Measurement | null>(null)
  const [selectedMeasurement, setSelectedMeasurement] = useState<Measurement | null>(null)
  console.log('hoveredMeasurement', hoveredMeasurement)
  useEffect(() => {
    setMeasurements(() =>
      initialMeasurement
        ? initialMeasurement.map<Measurement>(
            (addedMeasurement, i) =>
              ({
                ...addedMeasurement,
                id: nextId ?? i,
              } as Measurement)
          )
        : []
    )
  }, [initialMeasurement, nextId])

  const addMeasurement = (
    measurement: Measurement,
    measurementInfo: Pick<Measurement, 'dataAttrs'> | undefined
  ): Measurement | null => {
    if (measurement.type === 'ruler' && isSamePoints(measurement.startAndEndPoint)) return null
    if (measurement.type === 'circle' && measurement.radius === 0) return null
    if (measurementInfo?.dataAttrs) {
      validateDataAttrs(measurementInfo?.dataAttrs)
    }

    setMeasurements((prevMeasurements) => [...prevMeasurements, measurement])

    return measurement
  }

  const hoverMeasurement = (measurement: Measurement | null) => {
    // TODO: selectedMeasurement이 있을 때 hoveredMeasurement가 동작하지 않는 문제가 있습니다.
    // TODO: hoveredMeasurement가 제거되면 null으로 초기화되지 않는 문제가 있습니다.
    setHoveredMeasurement((prevHoveredMeasurement) =>
      measurement !== prevHoveredMeasurement ? measurement : prevHoveredMeasurement
    )
  }

  const removeMeasurement = (measurement: Measurement) => {
    setMeasurements((prevMeasurements) => {
      const index = prevMeasurements.findIndex(({ id }) => id === measurement.id)

      if (index > -1) {
        const nextMeasurements = [...prevMeasurements]
        nextMeasurements.splice(index, 1)

        return nextMeasurements
      }

      return prevMeasurements
    })

    setSelectedMeasurement(null)
    setHoveredMeasurement(null)
  }

  const selectMeasurement = (measurement: Measurement | null) => {
    if (measurement) removeMeasurement(measurement)

    setSelectedMeasurement((prevSelectedMeasurement) =>
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

    setMeasurements((prevMeasurements) => {
      const nextMeasurements = [...prevMeasurements]
      const index: number = nextMeasurements.findIndex(({ id }) => nextMeasurement.id === id)

      if (index > -1) {
        nextMeasurements[index] = nextMeasurement

        setSelectedMeasurement((prevSelectedMeasurement) =>
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
