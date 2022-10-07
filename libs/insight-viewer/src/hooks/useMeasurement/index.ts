import { useState, useEffect } from 'react'

import type { Measurement, MeasurementBase } from '../../types'
import type { UseMeasurementParams, MeasurementDrawingState } from './types'
import { isSamePoints } from '../../utils/common/isSamePoints'

export function useMeasurement({ nextId, initialMeasurement }: UseMeasurementParams): MeasurementDrawingState {
  const [measurements, setMeasurements] = useState<Measurement[]>([])
  const [hoveredMeasurement, setHoveredMeasurement] = useState<Measurement | null>(null)
  const [selectedMeasurement, setSelectedMeasurement] = useState<Measurement | null>(null)

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

  const initializeInstantMeasurement = () => {
    setSelectedMeasurement(null)
    setHoveredMeasurement(null)
  }

  const addMeasurement = (measurement: Measurement): Measurement | null => {
    if (measurement.type === 'ruler' && isSamePoints(measurement.startAndEndPoint)) return null
    if (measurement.type === 'circle' && measurement.radius === 0) return null

    setMeasurements((prevMeasurements) => [...prevMeasurements, measurement])

    return measurement
  }

  const hoverMeasurement = (measurement: Measurement | null) => {
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

    initializeInstantMeasurement()
  }

  const selectMeasurement = (measurement: Measurement | null) => {
    if (measurement) removeMeasurement(measurement)

    setSelectedMeasurement((prevSelectedMeasurement) =>
      measurement !== prevSelectedMeasurement ? measurement : prevSelectedMeasurement
    )
  }

  const updateMeasurement = (measurement: Measurement, patch: Partial<Omit<MeasurementBase, 'id' | 'type'>>) => {
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
    initializeInstantMeasurement()
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
