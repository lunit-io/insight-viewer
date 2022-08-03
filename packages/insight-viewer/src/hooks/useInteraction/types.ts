import { CornerstoneViewport } from 'utils/cornerstoneHelper'
import { Element, Viewport, OnViewportChange } from 'types'
import { DRAG, PRIMARY_DRAG, SECONDARY_DRAG, PRIMARY_CLICK, SECONDARY_CLICK, MOUSEWHEEL } from './const'

export type DragAction = keyof typeof DRAG
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

export type Wheel = (deltaX: number, deltaY: number) => void

export interface DragInteraction {
  [PRIMARY_DRAG]: DragAction | Drag | undefined
  [SECONDARY_DRAG]: DragAction | Drag | undefined
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
