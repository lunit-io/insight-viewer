import { useState, useEffect } from 'react'
import { useOverlayContext } from '../../contexts'

import { getMeasurement } from '../../utils/common/getMeasurement'
import { getMeasurementPointsByMode } from '../../utils/common/getMeasurementPointsByMode'
import { getTextPosition } from '../../utils/common/getTextPosition'
import { getMeasurementPoints } from '../../utils/common/getMeasurementPoints'
import { getEditPointPosition, EditPoints } from '../../utils/common/getEditPointPosition'
import { getExistingMeasurementPoints } from '../../utils/common/getExistingMeasurementPoints'
import { getCursorStatus } from '../../utils/common/getCursorStatus'
import { setClassName } from '../../utils/common/setClassName'

import useDrawingHandler from '../useDrawingHandler'

import type { UseMeasurementPointsHandlerParams, UseMeasurementPointsHandlerReturnType } from './types'
import type { Point, EditMode, Measurement } from '../../types'

const getMeasurementEditingPoints = ({
  measurement,
  pixelToCanvas,
}: {
  measurement: Measurement
  pixelToCanvas?: (point: Point) => Point
}) => {
  const selectedMeasurementPoints = getExistingMeasurementPoints(measurement)
  const currentPoints = pixelToCanvas ? selectedMeasurementPoints.map(pixelToCanvas) : selectedMeasurementPoints
  const currentEditingPoint = getEditPointPosition(currentPoints, measurement)

  return currentEditingPoint
}

export default function useMeasurementPointsHandler({
  mode,
  isEditing,
  svgElement,
  measurements,
  selectedMeasurement,
  hoveredMeasurement,
  addMeasurement,
  onSelectMeasurement,
}: UseMeasurementPointsHandlerParams): UseMeasurementPointsHandlerReturnType {
  const [editMode, setEditMode] = useState<EditMode | null>(null)
  const [editStartPoint, setEditStartPoint] = useState<Point | null>(null)
  const [editTargetPoints, setEditTargetPoints] = useState<EditPoints | null>(null)
  const [mouseDownPoint, setMouseDownPoint] = useState<Point | null>(null)
  const [measurement, setMeasurement] = useState<Measurement | null>(null)

  const [selectedMeasurementEditingFixedPoint, setSelectedMeasurementEditingFixedPoint] = useState<Point | null>(null)

  const { image, pixelToCanvas, enabledElement } = useOverlayContext()

  const cursorStatus = getCursorStatus({
    drawing: measurement,
    selectedDrawing: selectedMeasurement,
    editTargetPoints,
    editMode,
    editStartPoint,
  })

  setClassName(enabledElement, cursorStatus)

  useEffect(() => {
    if (!isEditing || selectedMeasurement == null) {
      setEditMode(null)
      setMeasurement(null)
      setEditStartPoint(null)
      setEditTargetPoints(null)
      onSelectMeasurement(null)
      setMouseDownPoint(null)
      setSelectedMeasurementEditingFixedPoint(null)
      return
    }

    const currentEditPoint = getMeasurementEditingPoints({ measurement: selectedMeasurement, pixelToCanvas })

    setMeasurement(selectedMeasurement)
    setEditTargetPoints(currentEditPoint)
  }, [isEditing, selectedMeasurement, pixelToCanvas, onSelectMeasurement])

  const setInitialMeasurement = (point: [mouseDownX: number, mouseDownY: number]) => {
    if (isEditing && selectedMeasurement != null) {
      setEditStartPoint(point)
      return
    }

    const initialMousePoints: [Point, Point] = [point, point]
    const initialTextPosition = null

    const initialMeasurement = getMeasurement(initialMousePoints, initialTextPosition, mode, measurements, image)
    setMeasurement(initialMeasurement)

    setMouseDownPoint(point)
  }

  const addDrawingMeasurement = (point: [mouseMoveX: number, mouseMoveY: number]) => {
    if (isEditing && selectedMeasurement != null && !editMode) return

    setMeasurement(() => {
      if (!measurement) return null

      const prevPoints = getExistingMeasurementPoints(measurement)
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

      const measurementPointsByMode = getMeasurementPointsByMode(
        isEditing,
        editMode,
        drawingMode,
        selectedMeasurementEditingFixedPoint ?? mouseDownPoint,
        point,
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

      const editPointsOnCanvas = currentPoints.map(pixelToCanvas) as [Point, Point]
      const editPoints = getEditPointPosition(editPointsOnCanvas, selectedMeasurement, drawingMode)
      setEditTargetPoints(editPoints)

      if (drawingMode === 'circle' && mouseDownPoint) {
        const currentPointsWithFixedPoint: [Point, Point] = [point, mouseDownPoint]
        const currentPointsWithFixedPointOnCanvas = currentPointsWithFixedPoint.map(pixelToCanvas) as [Point, Point]

        const editPoints = getEditPointPosition(
          editPointsOnCanvas,
          selectedMeasurement,
          drawingMode,
          editMode,
          currentPointsWithFixedPointOnCanvas
        )

        setEditTargetPoints(editPoints)
      } else if (
        currentMeasurement.type === 'circle' &&
        selectedMeasurementEditingFixedPoint &&
        (editMode === 'startPoint' || editMode === 'endPoint')
      ) {
        const currentPointsWithFixedPoint: [Point, Point] = [point, selectedMeasurementEditingFixedPoint]
        const currentPointsWithFixedPointOnCanvas = currentPointsWithFixedPoint.map(pixelToCanvas) as [Point, Point]

        const editPoints = getEditPointPosition(
          editPointsOnCanvas,
          selectedMeasurement,
          drawingMode,
          editMode,
          currentPointsWithFixedPointOnCanvas
        )

        setEditTargetPoints(editPoints)
      } else {
        const editPointsOnCanvas = currentPoints.map(pixelToCanvas) as [Point, Point]
        const editPoints = getEditPointPosition(editPointsOnCanvas, selectedMeasurement, drawingMode)

        setEditTargetPoints(editPoints)
      }

      return currentMeasurement
    })
  }

  const cancelDrawing = () => {
    if (isEditing && selectedMeasurement != null && editMode) {
      const targetMeasurement = measurement ?? selectedMeasurement
      const currentEditingPoints = getMeasurementEditingPoints({ measurement: targetMeasurement, pixelToCanvas })

      setEditTargetPoints(currentEditingPoints)
      setEditMode(null)
      return
    }

    setEditMode(null)
    setMeasurement(null)
    setEditStartPoint(null)
    setEditTargetPoints(null)
    onSelectMeasurement(null)
    setMouseDownPoint(null)
    setSelectedMeasurementEditingFixedPoint(null)
  }

  const addDrewMeasurement = () => {
    const isEditingMode = editMode && selectedMeasurement
    if (!measurement || isEditingMode) return
    if (addMeasurement) addMeasurement(measurement)
  }

  const setMeasurementEditMode = (targetPoint: EditMode) => {
    if (!isEditing || !selectedMeasurement) return

    setEditMode(targetPoint)

    if (
      targetPoint &&
      selectedMeasurement &&
      selectedMeasurement.type === 'circle' &&
      (targetPoint === 'startPoint' || targetPoint === 'endPoint')
    ) {
      const targetMeasurement = measurement ?? selectedMeasurement
      const currentEditingPoints = getMeasurementEditingPoints({ measurement: targetMeasurement })

      if (!currentEditingPoints) return

      const [startX, startY, endX, endY] = currentEditingPoints
      const fixedPoint: [number, number] = targetPoint === 'startPoint' ? [endX, endY] : [startX, startY]

      setSelectedMeasurementEditingFixedPoint(fixedPoint)
    }
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
    cursorStatus,
  }
}
