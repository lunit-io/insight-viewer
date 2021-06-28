import { DRAG, MOUSE_WHEEL, EVENT } from './const'

export type Drag = keyof typeof DRAG
export type MouseWheel = keyof typeof MOUSE_WHEEL

export interface DragInteraction {
  [EVENT.primaryDrag]: Drag | undefined
  [EVENT.secondaryDrag]: Drag | undefined
}

export interface WheelInteraction {
  [EVENT.mouseWheel]: MouseWheel
}

export type Interaction = DragInteraction & WheelInteraction

export type SetInteraction = React.Dispatch<React.SetStateAction<Interaction>>
