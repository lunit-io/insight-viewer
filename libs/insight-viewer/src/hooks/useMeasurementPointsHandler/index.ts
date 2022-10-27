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

  const [selectedMeasurementEditFixPoints, setSelectedMeasurementEditFixPoints] = useState<Point>()

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
    if (!isEditing || selectedMeasurement == null) return

    const selectedMeasurementPoints = getExistingMeasurementPoints(selectedMeasurement)
    const currentPoints = selectedMeasurementPoints.map(pixelToCanvas)
    const currentEditPoint = getEditPointPosition(currentPoints, selectedMeasurement)

    setMeasurement(selectedMeasurement)

    setEditTargetPoints(currentEditPoint)
  }, [isEditing, selectedMeasurement, pixelToCanvas])

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

      const editPointsOnCanvas = currentPoints.map(pixelToCanvas) as [Point, Point]
      const editPoints = getEditPointPosition(editPointsOnCanvas, selectedMeasurement, drawingMode)
      setEditTargetPoints(editPoints)

      const measurementPointsByMode = getMeasurementPointsByMode(
        isEditing,
        editMode,
        drawingMode,
        selectedMeasurementEditFixPoints ?? mouseDownPoint,
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

      if (
        currentMeasurement.type === 'circle' &&
        selectedMeasurementEditFixPoints &&
        (editMode === 'startPoint' || editMode === 'endPoint')
      ) {
        const [start, end] = [point, selectedMeasurementEditFixPoints].map(pixelToCanvas) as [Point, Point]
        const currentEditingPoints: [number, number, number, number] =
          editMode === 'startPoint' ? [start[0], start[1], end[0], end[1]] : [end[0], end[1], start[0], start[1]]

        setEditTargetPoints(currentEditingPoints)
      }

      return currentMeasurement
    })
  }

  const cancelDrawing = () => {
    if (isEditing && selectedMeasurement != null && editMode) {
      const targetMeasurement = measurement ?? selectedMeasurement
      const selectedMeasurementPoints = getExistingMeasurementPoints(targetMeasurement)
      const currentPoints = selectedMeasurementPoints.map(pixelToCanvas)
      const currentEditPoint = getEditPointPosition(currentPoints, targetMeasurement)

      setEditTargetPoints(currentEditPoint)
      setEditMode(null)
      return
    }

    setEditMode(null)
    setMeasurement(null)
    setEditStartPoint(null)
    setEditTargetPoints(null)
    onSelectMeasurement(null)
    setMouseDownPoint(null)
    setSelectedMeasurementEditFixPoints(undefined)
  }

  const addDrewMeasurement = () => {
    const isEditingMode = editMode && selectedMeasurement
    if (!measurement || isEditingMode) return
    if (addMeasurement) addMeasurement(measurement)
  }

  const setMeasurementEditMode = (targetPoint: EditMode) => {
    if (!isEditing || !selectedMeasurement) return

    if (targetPoint && selectedMeasurement && selectedMeasurement.type === 'circle') {
      const targetMeasurement = measurement ?? selectedMeasurement
      const selectedMeasurementPoints = getExistingMeasurementPoints(targetMeasurement)
      const editPointsOnCanvas = selectedMeasurementPoints as [Point, Point]
      const currentEdit = getEditPointPosition(editPointsOnCanvas, targetMeasurement, 'circle')

      if (currentEdit) {
        const [startX, startY, endX, endY] = currentEdit
        if (targetPoint === 'startPoint') {
          setSelectedMeasurementEditFixPoints([endX, endY])
        } else if (targetPoint === 'endPoint') {
          setSelectedMeasurementEditFixPoints([startX, startY])
        }
      }
    }

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
    cursorStatus,
  }
}
