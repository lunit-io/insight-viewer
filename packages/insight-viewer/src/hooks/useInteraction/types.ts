import { DRAG, MOUSE_WHEEL, EVENT } from './const'
import { CornerstoneViewport } from '../../utils/cornerstoneHelper'

export interface Coord {
  x: number
  y: number
}

export type Pan = (viewport: CornerstoneViewport, delta: Coord) => Coord
export type Adjust = (
  viewport: CornerstoneViewport,
  delta: Coord
) => {
  windowWidth: number
  windowCenter: number
}
export type Drag = keyof typeof DRAG | Pan
export type MouseWheel = keyof typeof MOUSE_WHEEL | Adjust

export interface DragInteraction {
  [EVENT.primaryDrag]: Drag | undefined
  [EVENT.secondaryDrag]: Drag | undefined
}

export interface WheelInteraction {
  [EVENT.mouseWheel]: MouseWheel
}

export type Interaction = DragInteraction & WheelInteraction

export type SetInteraction = React.Dispatch<React.SetStateAction<Interaction>>
