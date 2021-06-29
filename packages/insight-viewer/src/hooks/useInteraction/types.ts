import {
  DRAG,
  MOUSE_WHEEL,
  PRIMARY_DRAG,
  SECONDARY_DRAG,
  PRIMARY_CLICK,
  SECONDARY_CLICK,
  MOUSEWHEEL,
} from './const'
import { CornerstoneViewport } from '../../utils/cornerstoneHelper'

export type DragEvent = keyof typeof DRAG
export type WheelEvent = keyof typeof MOUSE_WHEEL
export type ClickEvent = (offsetX: number, offsetY: number) => void
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
  [PRIMARY_DRAG]: DragEvent | Drag | undefined
  [SECONDARY_DRAG]: DragEvent | Drag | undefined
}

export interface ClickInteraction {
  [PRIMARY_CLICK]: ClickEvent | undefined
  [SECONDARY_CLICK]: ClickEvent | undefined
}

export interface WheelInteraction {
  [MOUSEWHEEL]: WheelEvent | undefined
}

export type Interaction = DragInteraction & ClickInteraction & WheelInteraction

export type SetInteraction = React.Dispatch<React.SetStateAction<Interaction>>
