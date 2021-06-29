import { DRAG, MOUSE_WHEEL, EVENT } from './const'
import { CornerstoneViewport } from '../../utils/cornerstoneHelper'

export interface Coord {
  x: number
  y: number
}
export type Drag = (viewport: CornerstoneViewport, delta: Coord) => void
export type Pan = (viewport: CornerstoneViewport, delta: Coord) => Coord
export type Adjust = (
  viewport: CornerstoneViewport,
  delta: Coord
) => {
  windowWidth: number
  windowCenter: number
}
export type DragEvent = keyof typeof DRAG
export type WheelEvent = keyof typeof MOUSE_WHEEL

export interface DragInteraction {
  [EVENT.primaryDrag]: DragEvent | Pan | undefined
  [EVENT.secondaryDrag]: DragEvent | Adjust | undefined
}

export interface WheelInteraction {
  [EVENT.mouseWheel]: WheelEvent | undefined
}

export type Interaction = DragInteraction & WheelInteraction

export type SetInteraction = React.Dispatch<React.SetStateAction<Interaction>>
