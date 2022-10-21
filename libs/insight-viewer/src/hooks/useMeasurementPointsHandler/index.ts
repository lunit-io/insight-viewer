import { useState, useEffect } from 'react'
import useTilg from 'tilg'
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

let i = 0

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
  // useTilg()
  console.log('-------------------------', i++)
  // console.log('edit Mode is :', editMode) // prints out null when redraw is not applicable
  // console.log('edit startpoint is :', editStartPoint)
  // console.log('editTargetPoints is :', editTargetPoints)
  // console.log('measurement', measurement)
  // console.log('mouseDownPoint is:', mouseDownPoint)
  // console.log('hoveredMeasurement', hoveredMeasurement) // prints out the measurement which is hovered.
  // console.log('isEditing', isEditing) // prints out true when the measurement is being edited.
  const isHovered = hoveredMeasurement !== null
  const isEditMode = editMode !== null
  const isDrawing = editMode === null && editStartPoint !== null && mouseDownPoint !== null
  const isEditingLinePoint = editMode === 'startPoint' || editMode === 'endPoint'
  const isMoving = editMode === 'move' || editMode === 'textMove'
  // console.log('mode', mode)
  // const isHovered = hoveredMeasurement !== null
  const getStatus = () => {
    if (isEditMode) {
      if (isMoving) return ' moving'
      if (isEditingLinePoint) return 'editing'
    }

    if (isDrawing) return 'drawing'
    if (isHovered) return 'hovered'
    return 'idle'
  }
  // console.log('isHovered', isHovered) // prints out true when the measurement is being drawn.
  // let status = 'idle'
  // if (isEditMode) {
  //   if (isMoving) status = ' moving'
  //   if (isEditingLinePoint) status = 'editing'
  // }
  // if (isDrawing) status = 'drawing'
  // if (isHovered) status = 'hovered'
  console.log('status', getStatus())
  const { image, pixelToCanvas } = useOverlayContext()

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
        mouseDownPoint,
        point,
        currentPoints
      )

      const currentMeasurement = getMeasurement(
        measurementPointsByMode,
        currentTextPosition,
        drawingMode,
        measurements,
        image
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
    setMouseDownPoint(null)
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
    measurement,
    currentEditMode: editMode,
    editPoints: editTargetPoints,
    setMeasurementEditMode,
  }
}
