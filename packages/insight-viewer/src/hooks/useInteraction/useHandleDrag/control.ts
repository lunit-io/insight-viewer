import { DragAction, DragEventHandler } from '../types'

const pan: DragEventHandler = (viewport, event) => ({
  x: viewport.translation.x + event.deltaX / viewport.scale,
  y: viewport.translation.y + event.deltaY / viewport.scale,
})

const adjust: DragEventHandler = (viewport, event) => ({
  windowWidth: viewport.voi.windowWidth + event.deltaX / viewport.scale,
  windowCenter: viewport.voi.windowCenter + event.deltaY / viewport.scale,
})

type Control = Record<DragAction, DragEventHandler>

const control: Control = {
  pan,
  adjust,
}

export default control
