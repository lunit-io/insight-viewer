import { DRAG, MOUSE_WHEEL, EVENT } from './const'
import { CornerstoneViewport } from '../../utils/cornerstoneHelper'

export interface Coord {
  x: number
  y: number
}
export type BasicPan = (viewport: CornerstoneViewport, delta: Coord) => Coord
export type Pan =
  | BasicPan
  | ((viewport: CornerstoneViewport, delta: Coord) => void)
export type BasicAdjust = (
  viewport: CornerstoneViewport,
  delta: Coord
) => {
  windowWidth: number
  windowCenter: number
}
export type Adjust =
  | BasicAdjust
  | ((viewport: CornerstoneViewport, delta: Coord) => void)
export type Drag = keyof typeof DRAG
export type MouseWheel = keyof typeof MOUSE_WHEEL

export interface DragInteraction {
  [EVENT.primaryDrag]: Drag | Pan | undefined
  [EVENT.secondaryDrag]: Drag | Adjust | undefined
}

export interface WheelInteraction {
  [EVENT.mouseWheel]: MouseWheel | undefined
}

export type Interaction = DragInteraction & WheelInteraction

export type SetInteraction = React.Dispatch<React.SetStateAction<Interaction>>
