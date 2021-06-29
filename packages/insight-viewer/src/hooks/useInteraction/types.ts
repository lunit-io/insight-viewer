import { DRAG, MOUSE_WHEEL, EVENT } from './const'
import { CornerstoneViewport } from '../../utils/cornerstoneHelper'

export type DragEvent = keyof typeof DRAG
export type WheelEvent = keyof typeof MOUSE_WHEEL

export interface Coord {
  x: number
  y: number
}
export type Drag = ({
  viewport,
  delta,
  updateViewport,
}: {
  viewport: CornerstoneViewport
  delta: Coord
  updateViewport: (e?: DragEvent) => void
}) => void
export type Pan = (viewport: CornerstoneViewport, delta: Coord) => Coord
export type Adjust = (
  viewport: CornerstoneViewport,
  delta: Coord
) => {
  windowWidth: number
  windowCenter: number
}
export interface DragInteraction {
  [EVENT.primaryDrag]: DragEvent | Drag | undefined
  [EVENT.secondaryDrag]: DragEvent | Drag | undefined
}

export interface WheelInteraction {
  [EVENT.mouseWheel]: WheelEvent | undefined
}

export type Interaction = DragInteraction & WheelInteraction

export type SetInteraction = React.Dispatch<React.SetStateAction<Interaction>>
