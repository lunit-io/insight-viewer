import { useState, useEffect } from 'react'

import { useOverlayContext } from '../../contexts'

import { getMeasurement } from '../../utils/common/getMeasurement'
import { getMeasurementPointsByMode } from '../../utils/common/getMeasurementPointsByMode'
import { getTextPosition } from '../../utils/common/getTextPosition'
import { getMeasurementPoints } from '../../utils/common/getMeasurementPoints'
import { getEditPointPosition, EditPoints } from '../../utils/common/getEditPointPosition'
import { getExistingMeasurementPoints } from '../../utils/common/getExistingMeasurementPoints'

import useDrawingHandler from '../useDrawingHandler'

import type { UseMeasurementPointsHandlerParams, UseMeasurementPointsHandlerReturnType } from './types'
import type { Point, EditMode, Measurement } from '../../types'

export default function useMeasurementPointsHandler({
  mode,
  isEditing,
  svgElement,
  measurements,
  selectedMeasurement,
  addMeasurement,
  onSelectMeasurement,
  hoveredMeasurement,
}: UseMeasurementPointsHandlerParams): UseMeasurementPointsHandlerReturnType {
  const [editMode, setEditMode] = useState<EditMode | null>(null)
  const [editStartPoint, setEditStartPoint] = useState<Point | null>(null)
  const [editTargetPoints, setEditTargetPoints] = useState<EditPoints | null>(null)
  const [editPointsOnSelected, setEditPointsOnSelected] = useState<EditPoints | null>(null)
  const [mouseDownPoint, setMouseDownPoint] = useState<Point | null>(null)
  const [measurement, setMeasurement] = useState<Measurement | null>(null)

  const { image, pixelToCanvas } = useOverlayContext()

  useEffect(() => {
    if (!isEditing || selectedMeasurement == null) return

    const selectedMeasurementPoints = getExistingMeasurementPoints(selectedMeasurement)
    const currentPoints = selectedMeasurementPoints.map(pixelToCanvas)
    const currentEditPoint = getEditPointPosition(currentPoints, selectedMeasurement)

    const editPoint = getEditPointPosition(selectedMeasurementPoints, selectedMeasurement)
    setMeasurement(selectedMeasurement)
    setEditTargetPoints(editPoint)
    // setEditPointsOnSelected(currentEditPoint)
    // setEditPointsOnSelected(currentEditPoint)
    console.log(selectedMeasurement, currentEditPoint)
  }, [isEditing, selectedMeasurement, pixelToCanvas])

  const setInitialMeasurement = (point: [mouseDownX: number, mouseDownY: number]) => {
    if (isEditing && selectedMeasurement !== null) {
      setEditStartPoint(point)
      return
    }

    const initialMousePoints: [Point, Point] = [point, point]
    const initialTextPosition = null

    const initialMeasurement = getMeasurement(initialMousePoints, initialTextPosition, mode, measurements, image)

    setMeasurement(initialMeasurement)
    setMouseDownPoint(point)
  }

  const addDrawingMeasurement = (mouseMovePoint: [mouseMoveX: number, mouseMoveY: number]) => {
    if (isEditing && selectedMeasurement !== null && !editMode) return

    setMeasurement(() => {
      if (!measurement || !mouseDownPoint) return null

      const prevPoints = getExistingMeasurementPoints(measurement)

      const currentPoints = getMeasurementPoints({
        mode,
        mouseDownPoint,
        mouseMovePoint,
        editPointsOnSelected,
        editMode,
        isEditing,
        prevPoints,
        editStartPoint,
        selectedMeasurement,
      })

      setEditStartPoint(mouseMovePoint)
      const drawingMode = isEditing && selectedMeasurement !== null ? selectedMeasurement.type : mode

      const currentTextPosition = getTextPosition(measurement, editMode, mouseMovePoint)

      const editPointsOnCanvas = currentPoints.map(pixelToCanvas) as [Point, Point]
      const editPoints = getEditPointPosition(editPointsOnCanvas, selectedMeasurement)
      setEditTargetPoints(editPoints)

      const measurementPointsByMode = getMeasurementPointsByMode(
        isEditing,
        editMode,
        drawingMode,
        mouseDownPoint,
        mouseMovePoint,
        editPointsOnSelected,
        currentPoints
      )

      const currentMeasurement = getMeasurement(
        measurementPointsByMode,
        currentTextPosition,
        drawingMode,
        measurements,
        image,
        measurement
      )

      return currentMeasurement
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
    hoveredDrawing: hoveredMeasurement,
  })

  return {
    measurement,
    currentEditMode: editMode,
    editPoints: editTargetPoints,
    setMeasurementEditMode,
  }
}
