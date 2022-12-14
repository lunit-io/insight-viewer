import { DRAG, PRIMARY_DRAG, SECONDARY_DRAG, PRIMARY_CLICK, SECONDARY_CLICK, MOUSEWHEEL, MOUSE_WHEEL } from './const'
import { CornerstoneViewport, CornerstoneImage } from '../../utils/cornerstoneHelper'
import { Element, Viewport, OnViewportChange } from '../../types'

export type DragAction = keyof typeof DRAG
export type WheelAction = keyof typeof MOUSE_WHEEL
/** @deprecated in flavor of DragAction */
export type DragEvent = DragAction
export type Click = (offsetX: number, offsetY: number) => void
export interface DragCoords {
  startX: number
  startY: number
  deltaX: number
  deltaY: number
}
export type Drag = ({ viewport, delta }: { viewport: CornerstoneViewport; delta: { x: number; y: number } }) => void
export type DragEventHandler = (viewport: CornerstoneViewport, dragEvent: DragCoords) => Partial<Viewport>

export interface WheelCoords {
  deltaX: number
  deltaY: number
}
export type Wheel = (deltaX: number, deltaY: number) => void
export type WheelEventHandler = (viewport: CornerstoneViewport, wheelEvent: WheelCoords) => Partial<Viewport>

export interface DragInteraction {
  [PRIMARY_DRAG]: DragAction | Drag | undefined
  [SECONDARY_DRAG]: DragAction | Drag | undefined
}

export interface ClickInteraction {
  [PRIMARY_CLICK]: Click | undefined
  [SECONDARY_CLICK]: Click | undefined
}

export interface WheelInteraction {
  [MOUSEWHEEL]: WheelAction | Wheel | undefined
}

export type Interaction = DragInteraction & ClickInteraction & WheelInteraction

export type SetInteraction = React.Dispatch<React.SetStateAction<Interaction>>

export interface ViewportInteraction {
  element: Element
  image?: CornerstoneImage
  interaction?: Interaction
  viewport?: Viewport
  onViewportChange?: OnViewportChange
}
