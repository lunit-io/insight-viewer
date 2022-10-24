import { EditMode, Measurement, Point } from '../../types'

const checkCursorStatus = ({
  isEditMode,
  isMoving,
  isEditingLinePoint,
  isDrawing,
  isHovered,
}: {
  isEditMode: boolean
  isMoving: boolean
  isEditingLinePoint: boolean
  isDrawing: boolean
  isHovered: boolean
}) => {
  if (isEditMode) {
    if (isMoving) return 'moving'
    if (isEditingLinePoint) return 'editing'
  }
  if (isDrawing) return 'drawing'
  if (isHovered) return 'hovered'

  return 'idle'
}

const refineCanvasInformation = ({
  hoveredMeasurement,
  editMode,
  editStartPoint,
  mouseDownPoint,
}: {
  hoveredMeasurement: Measurement | null
  editMode: EditMode | null
  editStartPoint: Point | null
  mouseDownPoint: Point | null
}) => {
  const isHovered = hoveredMeasurement !== null
  const isEditMode = editMode !== null
  const isDrawing = editMode === null && editStartPoint !== null && mouseDownPoint !== null
  const isEditingLinePoint = editMode === 'startPoint' || editMode === 'endPoint'
  const isMoving = editMode === 'move' || editMode === 'textMove'

  return {
    isHovered,
    isEditMode,
    isDrawing,
    isEditingLinePoint,
    isMoving,
  }
}

export const getCursorStatus = (canvasInformation: {
  hoveredMeasurement: Measurement | null
  editMode: EditMode | null
  editStartPoint: Point | null
  mouseDownPoint: Point | null
}) => {
  // console.log('editMode', canvasInformation)
  const refinedCanvasInformation = refineCanvasInformation(canvasInformation)
  const cursorStatus = checkCursorStatus(refinedCanvasInformation)

  return cursorStatus
}
