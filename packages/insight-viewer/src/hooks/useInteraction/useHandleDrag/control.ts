import { DragAction, DragEventHandler } from '../types'

const pan: DragEventHandler = (viewport, event) => ({
  x: viewport.translation.x + event.deltaX / viewport.scale,
  y: viewport.translation.y + event.deltaY / viewport.scale,
})

const adjust: DragEventHandler = (viewport, event) => ({
  windowWidth: viewport.voi.windowWidth + event.deltaX / viewport.scale,
  windowCenter: viewport.voi.windowCenter + event.deltaY / viewport.scale,
})

const zoom: DragEventHandler = (viewport, event) => {
  const newScale = Math.max(0.01, viewport.scale + event.deltaX / 100)
  const newX = viewport.translation.x + event.startX * (1 / newScale - 1 / viewport.scale)
  const newY = viewport.translation.y + event.startY * (1 / newScale - 1 / viewport.scale)
  return {
    scale: newScale,
    x: newX,
    y: newY,
  }
}

type Control = Record<DragAction, DragEventHandler>

const control: Control = {
  pan,
  adjust,
  zoom,
}

export default control
