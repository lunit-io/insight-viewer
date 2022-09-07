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
  const scaleModifier = event.deltaX !== 0 ? Math.log2(Math.abs(event.deltaX)) * Math.sign(event.deltaX) : 0
  const nextScale = Math.max(0.01, viewport.scale + scaleModifier * 0.01)
  const ratio = 1 / nextScale - 1 / viewport.scale
  const newX = viewport.translation.x + event.startX * ratio
  const newY = viewport.translation.y + event.startY * ratio

  return {
    scale: nextScale,
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
