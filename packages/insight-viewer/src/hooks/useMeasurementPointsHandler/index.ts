import { useState, useEffect } from 'react'

import { Point, EditMode, Measurement, DrawingMeasurement } from 'types'
import { useOverlayContext } from 'contexts'

import { getMeasurement } from 'utils/common/getMeasurement'
import { getTextPosition } from 'utils/common/getTextPosition'
import { getMeasurementPoints } from 'utils/common/getMeasurementPoints'
import { getDrawingMeasurement } from 'utils/common/getDrawingMeasurement'
import { getEditPointPosition, EditPoints } from 'utils/common/getEditPointPosition'
import { getExistingMeasurementPoints } from 'utils/common/getExistingMeasurementPoints'

import { UseMeasurementPointsHandlerParams, UseMeasurementPointsHandlerReturnType } from './types'
import useDrawingHandler from '../useDrawingHandler'

export default function useMeasurementPointsHandler({
  mode,
  isEditing,
  svgElement,
  measurements,
  selectedMeasurement,
  addMeasurement,
  onSelectMeasurement,
}: UseMeasurementPointsHandlerParams): UseMeasurementPointsHandlerReturnType {
  const [editMode, setEditMode] = useState<EditMode | null>(null)
  const [editStartPoint, setEditStartPoint] = useState<Point | null>(null)
  const [editTargetPoints, setEditTargetPoints] = useState<EditPoints | null>(null)
  const [measurement, setMeasurement] = useState<Measurement | null>(null)
  const [drawingMeasurement, setDrawingMeasurement] = useState<DrawingMeasurement | null>(null)

  const { image, pixelToCanvas } = useOverlayContext()

  useEffect(() => {
    if (!isEditing || selectedMeasurement == null) return

    const selectedMeasurementPoints = getExistingMeasurementPoints(selectedMeasurement, image)

    const currentPoints = selectedMeasurementPoints.map(pixelToCanvas)

    const currentEditPoint = getEditPointPosition(currentPoints, selectedMeasurement)

    const editTargetDrawingMeasurement = getDrawingMeasurement(
      selectedMeasurementPoints,
      selectedMeasurement,
      pixelToCanvas
    )

    setMeasurement(selectedMeasurement)
    setEditTargetPoints(currentEditPoint)
    setDrawingMeasurement(editTargetDrawingMeasurement)
  }, [image, isEditing, selectedMeasurement, pixelToCanvas])

  const setInitialMeasurement = (point: Point) => {
    if (isEditing && selectedMeasurement != null) {
      setEditStartPoint(point)
      return
    }

    const initialStartPoint: [Point, Point] = [point, point]
    const initialTextPosition = getTextPosition(measurement)

    const currentMeasurement = getMeasurement(initialStartPoint, initialTextPosition, mode, measurements, image)
    setMeasurement(currentMeasurement)

    const currentDrawingMeasurement = getDrawingMeasurement(initialStartPoint, currentMeasurement, pixelToCanvas)

    setDrawingMeasurement(currentDrawingMeasurement)
  }

  const addDrawingMeasurement = (point: Point) => {
    if (isEditing && selectedMeasurement != null && !editMode) return

    setDrawingMeasurement(() => {
      if (!measurement) return null

      const prevPoints = getExistingMeasurementPoints(measurement, image)

      const currentPoints = getMeasurementPoints({
        mode,
        point,
        editMode,
        isEditing,
        prevPoints,
        editStartPoint,
        selectedMeasurement,
      })

      setEditStartPoint(point)

      const drawingMode = isEditing && selectedMeasurement != null ? selectedMeasurement.type : mode

      const currentTextPosition = getTextPosition(measurement, editMode, point)

      const canvasPoints = currentPoints.map(pixelToCanvas) as [Point, Point]
      const editPoints = getEditPointPosition(canvasPoints, selectedMeasurement)
      setEditTargetPoints(editPoints)

      const currentMeasurement = getMeasurement(currentPoints, currentTextPosition, drawingMode, measurements, image)
      setMeasurement(currentMeasurement)

      const currentDrawingMeasurement = getDrawingMeasurement(currentPoints, currentMeasurement, pixelToCanvas)

      return currentDrawingMeasurement
    })
  }

  const cancelDrawing = () => {
    if (isEditing && selectedMeasurement != null && editMode) {
      setEditMode(null)
      return
    }

    setEditMode(null)
    setMeasurement(null)
    setEditStartPoint(null)
    setEditTargetPoints(null)
    onSelectMeasurement(null)
    setDrawingMeasurement(null)
  }

  const addDrewMeasurement = () => {
    const isEditingMode = editMode && selectedMeasurement

    if (!measurement || isEditingMode) return

    addMeasurement(measurement)
  }

  const setMeasurementEditMode = (targetPoint: EditMode) => {
    if (!isEditing || !selectedMeasurement) return

    setEditMode(targetPoint)
  }

  useDrawingHandler({
    mode,
    svgElement,
    setInitialPoint: setInitialMeasurement,
    addDrawingPoint: addDrawingMeasurement,
    cancelDrawing,
    addDrewElement: addDrewMeasurement,
  })

  return {
    measurement: drawingMeasurement,
    currentEditMode: editMode,
    editPoints: editTargetPoints,
    setMeasurementEditMode,
  }
}
