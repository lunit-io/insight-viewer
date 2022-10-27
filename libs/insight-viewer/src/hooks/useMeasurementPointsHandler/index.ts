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
import { getCircleEditPoints } from '../../utils/common/getCircleEditPoints'
import { editPoint } from '../../../../../apps/insight-viewer-docs-e2e/src/support/utils'

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
  const [editPointsOnSelected, setEditPointsOnSelected] = useState<EditPoints | null>(null)
  const [mouseDownPoint, setMouseDownPoint] = useState<Point | null>(null)
  const [measurement, setMeasurement] = useState<Measurement | null>(null)

  const { image, pixelToCanvas, enabledElement } = useOverlayContext()

  const cursorStatus = getCursorStatus({
    drawing: measurement,
    selectedDrawing: selectedMeasurement,
    editTargetPoints,
    editMode,
    editStartPoint,
  })

  setClassName(enabledElement, cursorStatus)

  // let editPointsOnSelected: EditPoints | null = null

  useEffect(() => {
    if (!isEditing || selectedMeasurement == null) return

    const selectedMeasurementPoints = getExistingMeasurementPoints(selectedMeasurement)
    const currentPoints = selectedMeasurementPoints.map(pixelToCanvas)
    const currentEditPoint = getEditPointPosition(currentPoints, selectedMeasurement)

    const editPoint = getEditPointPosition(selectedMeasurementPoints, selectedMeasurement)
    setMeasurement(selectedMeasurement)

    setEditTargetPoints(currentEditPoint)
    setEditPointsOnSelected(editPoint)
    console.log(selectedMeasurement)
    console.log(
      `editPoint: ${editPoint}
       currentEditPoint: ${currentEditPoint}`
    )
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
      // mouseMove, prevEditEnd

      const editPoints = getEditPointPosition(editPointsOnCanvas, selectedMeasurement)
      setEditTargetPoints(editPoints)

      if (selectedMeasurement && selectedMeasurement.type === 'circle' && (editMode === "startPoint" || editMode === "endPoint")) {
        setEditTargetPoints([
          editPointsOnCanvas[0][0],
          editPointsOnCanvas[0][1],
          editPointsOnCanvas[1][0],
          editPointsOnCanvas[1][1],
        ])
        console.log(editTargetPoints)
      }

      const mm = getMeasurementPointsByMode(
        isEditing,
        editMode,
        drawingMode,
        mouseDownPoint,
        mouseMovePoint,
        editTargetPoints,
        currentPoints
      )
      const currentMeasurement = getMeasurement(mm, currentTextPosition, drawingMode, measurements, image, measurement)

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
    // setEditPointsOnSelected(null)
    // editPointsOnSelected = null
    setMouseDownPoint(null)
  }

  const addDrewMeasurement = () => {
    const isEditingMode = editMode && selectedMeasurement
    if (!measurement || isEditingMode) return
    if (addMeasurement) addMeasurement(measurement)
  }

  // 1.한 번 클릭하면 editTarget이 고정됨
  // 2. 크기가 줄어들었다가 커졌다가 함
  const setMeasurementEditMode = (targetPoint: EditMode) => {
    if (!isEditing || !selectedMeasurement) return
    if (
      targetPoint &&
      selectedMeasurement &&
      selectedMeasurement.type === 'circle'
      // (targetPoint === 'startPoint' || targetPoint === 'endPoint')
    ) {
      const targetMeasurement = measurement ?? selectedMeasurement
      const selectedMeasurementPoints = getExistingMeasurementPoints(targetMeasurement)
      const editPointsOnCanvas = selectedMeasurementPoints as [Point, Point]
      const currentEdit = getEditPointPosition(editPointsOnCanvas, targetMeasurement, 'circle')
      setEditPointsOnSelected(currentEdit)
      // editPointsOnSelected = currentEdit
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
