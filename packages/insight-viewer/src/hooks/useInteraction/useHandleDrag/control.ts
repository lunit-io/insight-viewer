import { DragAction, DragEventHandler } from '../types'

const pan: DragEventHandler = (viewport, event) => ({
  x: viewport.translation.x + event.deltaX / viewport.scale,
  y: viewport.translation.y + event.deltaY / viewport.scale,
})

const adjust: DragEventHandler = (viewport, event) => ({
  windowWidth: viewport.voi.windowWidth + event.deltaX / viewport.scale,
  windowCenter: viewport.voi.windowCenter + event.deltaY / viewport.scale,
})

const zoom: DragEventHandler = (viewport, event) => ({
  scale: viewport.scale + event.deltaX / 100,
})

type Control = Record<DragAction, DragEventHandler>

const control: Control = {
  pan,
  adjust,
  zoom,
}

export default control
