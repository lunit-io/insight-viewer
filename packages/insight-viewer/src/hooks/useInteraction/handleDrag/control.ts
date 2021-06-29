import { DragEvent, Pan, Adjust } from '../types'

const pan: Pan = (viewport, delta) => ({
  x: viewport.translation.x + delta.x / viewport.scale,
  y: viewport.translation.y + delta.y / viewport.scale,
})

const adjust: Adjust = (viewport, delta) => ({
  windowWidth: viewport.voi.windowWidth + delta.x / viewport.scale,
  windowCenter: viewport.voi.windowCenter + delta.y / viewport.scale,
})

type Control = Record<DragEvent, typeof pan | typeof adjust>

const control: Control = {
  pan,
  adjust,
}

export default control
