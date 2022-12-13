import { WheelAction, WheelEventHandler } from '../types'

const MIN_SCALE = 0.1
const MAX_SCALE = 10

const scale: WheelEventHandler = (viewport, event) => {
  const newScale = Math.min(Math.max(viewport.scale + (event.deltaY > 0 ? 0.25 : -0.25), MIN_SCALE), MAX_SCALE)

  return {
    scale: newScale,
  }
}

type Control = Record<WheelAction, WheelEventHandler>

const control: Control = { scale }

export default control
