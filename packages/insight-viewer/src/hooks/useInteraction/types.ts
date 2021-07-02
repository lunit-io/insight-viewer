import {
  DRAG,
  PRIMARY_DRAG,
  SECONDARY_DRAG,
  PRIMARY_CLICK,
  SECONDARY_CLICK,
  MOUSEWHEEL,
} from './const'
import { CornerstoneViewport } from '../../utils/cornerstoneHelper'
import { Element, Viewport, OnViewportChange } from '../../types'

export type DragEvent = keyof typeof DRAG
export type Click = (offsetX: number, offsetY: number) => void
export interface Coord {
  x: number
  y: number
}
export type Drag = ({
  viewport,
  delta,
}: {
  viewport: CornerstoneViewport
  delta: Coord
}) => void
export type Pan = (viewport: CornerstoneViewport, delta: Coord) => Coord
export type Adjust = (
  viewport: CornerstoneViewport,
  delta: Coord
) => {
  windowWidth: number
  windowCenter: number
}
export type Wheel = (deltaX: number, deltaY: number) => void
export interface DragInteraction {
  [PRIMARY_DRAG]: DragEvent | Drag | undefined
  [SECONDARY_DRAG]: DragEvent | Drag | undefined
}

export interface ClickInteraction {
  [PRIMARY_CLICK]: Click | undefined
  [SECONDARY_CLICK]: Click | undefined
}

export interface WheelInteraction {
  [MOUSEWHEEL]: Wheel | undefined
}

export type Interaction = DragInteraction & ClickInteraction & WheelInteraction

export type SetInteraction = React.Dispatch<React.SetStateAction<Interaction>>

export interface ViewportInteraction {
  element: Element
  interaction?: Interaction
  viewport?: Viewport
  onViewportChange?: OnViewportChange
}
