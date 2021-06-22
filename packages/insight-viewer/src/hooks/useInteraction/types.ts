import { MOUSE_MOVE_DOWN, MOUSE_WHEEL } from './const'

export type MouseDownMove = keyof typeof MOUSE_MOVE_DOWN | undefined
export type MouseWheel = keyof typeof MOUSE_WHEEL | undefined

export type Interaction = {
  mouseDownMove: MouseDownMove
  mouseWheel: MouseWheel
}

export type SetInteraction = React.Dispatch<React.SetStateAction<Interaction>>
