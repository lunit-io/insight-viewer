import { useState, useEffect } from 'react'

import { UseMeasurementPointsHandlerProps, UseMeasurementPointsHandlerReturnType } from './types'
import { Point, EditMode } from '../../types'
import { useOverlayContext } from '../../contexts'
import { calculateDistance } from '../../utils/common/calculateDistance'
import { getDrewMeasurement } from '../../utils/common/getDrewMeasurement'
import { getRulerTextPosition } from '../../utils/common/getRulerTextPosition'
import { getCircleTextPosition } from '../../utils/common/getCircleTextPosition'
import { getLineLengthWithoutImage } from '../../utils/common/getLineLengthWithoutImage'
import { getEditPointPosition, EditPoints } from '../../utils/common/getEditPointPosition'
import { getMeasurementDrawingPoints } from '../../utils/common/getMeasurementDrawingPoints'
import { getMeasurementEditingPoints } from '../../utils/common/getMeasurementEditingPoints'
import useDrawingHandler from '../useDrawingHandler'

export default function useMeasurementPointsHandler({
  mode,
  isEditing,
  svgElement,
  measurements,
  selectedMeasurement,
  addMeasurement,
  onSelectMeasurement,
}: UseMeasurementPointsHandlerProps): UseMeasurementPointsHandlerReturnType {
  const [points, setPoints] = useState<Point[]>([])
  const [textPoint, setTextPoint] = useState<Point | null>(null)
  const [editPoint, setEditPoint] = useState<Point | null>(null)
  const [editMode, setEditMode] = useState<EditMode | null>(null)
  const [editTargetPoints, setEditTargetPoints] = useState<EditPoints | null>(null)

  const { image, pixelToCanvas } = useOverlayContext()

  const isMeasurementEditing = isEditing && selectedMeasurement && editMode

  useEffect(() => {
    const pixelPoints = points.map(pixelToCanvas)
    const editPoints = getEditPointPosition(pixelPoints, selectedMeasurement)

    setEditTargetPoints(editPoints)
  }, [image, points, mode, selectedMeasurement, pixelToCanvas])

  useEffect(() => {
    if (!isEditing || !selectedMeasurement) return

    if (selectedMeasurement.type === 'ruler') {
      setPoints(selectedMeasurement.points)
    }

    if (selectedMeasurement.type === 'circle') {
      const { center, radius } = selectedMeasurement
      const calculatedDistance = calculateDistance(radius, image)
      const endPoint: Point = [center[0] + (calculatedDistance ?? 0), center[1]]

      setPoints([center, endPoint])
    }
  }, [image, isEditing, selectedMeasurement])

  const addStartPoint = (point: Point) => {
    if (isEditing && selectedMeasurement) {
      setEditPoint(point)
      return
    }

    setPoints([point])
  }

  const addDrawingPoint = (point: Point) => {
    setPoints(prevPoints => {
      const isPrepareEditing = isEditing && selectedMeasurement && !editMode

      if (prevPoints.length === 0 || isPrepareEditing) return prevPoints

      if (isEditing && selectedMeasurement && editMode && editPoint) {
        const editedPoints = getMeasurementEditingPoints(
          prevPoints,
          point,
          editPoint,
          editMode,
          selectedMeasurement.type,
          setEditPoint
        )

        return editedPoints
      }

      const drawingPoints = getMeasurementDrawingPoints(prevPoints, point, mode)

      return drawingPoints
    })

    setTextPoint(() => {
      if (points.length < 2) return null

      if (mode === 'ruler') {
        return getRulerTextPosition(point)
      }
      // mode === 'circle'
      const drawingRadius = getLineLengthWithoutImage(points[0], points[1])

      return getCircleTextPosition(points[0], drawingRadius)
    })
  }

  const cancelDrawing = () => {
    if (isMeasurementEditing) {
      setEditMode(null)
      return
    }

    setPoints([])
    setEditPoint(null)
    setEditMode(null)
    onSelectMeasurement(null)
  }

  const addDrewMeasurement = () => {
    if (isMeasurementEditing) return

    if (points.length > 1 && textPoint) {
      const drawingMode = isEditing && selectedMeasurement ? selectedMeasurement.type : mode
      const drewMeasurement = getDrewMeasurement(points, textPoint, drawingMode, measurements, image)

      addMeasurement(drewMeasurement)
    }
  }

  const setMeasurementEditMode = (targetPoint: EditMode) => {
    if (!isEditing || !selectedMeasurement) return

    setEditMode(targetPoint)
  }

  useDrawingHandler({
    mode,
    svgElement,
    addStartPoint,
    addDrawingPoint,
    cancelDrawing,
    addDrewElement: addDrewMeasurement,
  })

  return { points, textPoint, editPoints: editTargetPoints, setMeasurementEditMode }
}
