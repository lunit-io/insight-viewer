import { useState, useEffect } from 'react'

import { UseMeasurementPointsHandlerProps, UseMeasurementPointsHandlerReturnType } from './types'
import { Point, EditMode } from '../../types'
import { useOverlayContext } from '../../contexts'
import { getDrewMeasurement } from '../../utils/common/getDrewMeasurement'
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
  const [editPoint, setEditPoint] = useState<Point | null>(null)
  const [editMode, setEditMode] = useState<EditMode | null>(null)

  const { image } = useOverlayContext()

  const isMeasurementEditing = isEditing && selectedMeasurement && editMode

  useEffect(() => {
    if (!isEditing || !selectedMeasurement) return

    if (selectedMeasurement.type === 'ruler') {
      setPoints(selectedMeasurement.points)
    }
  }, [isEditing, selectedMeasurement])

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
        const editedPoints = getMeasurementEditingPoints(prevPoints, point, editPoint, editMode, mode, setEditPoint)

        return editedPoints
      }

      const drawingPoints = getMeasurementDrawingPoints(prevPoints, point, mode)

      return drawingPoints
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

    if (points.length > 1) {
      const drewMeasurement = getDrewMeasurement(points, mode, measurements, image)

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

  return { points, setMeasurementEditMode }
}
