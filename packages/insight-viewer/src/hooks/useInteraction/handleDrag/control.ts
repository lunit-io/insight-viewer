import { CornerstoneViewport } from '../../../utils/cornerstoneHelper'
import { Coord, Drag } from '../types'

function pan(viewport: CornerstoneViewport, delta: Coord): Coord {
  return {
    x: viewport.translation.x + delta.x / viewport.scale,
    y: viewport.translation.y + delta.y / viewport.scale,
  }
}

function adjust(
  viewport: CornerstoneViewport,
  delta: Coord
): {
  windowWidth: number
  windowCenter: number
} {
  return {
    windowWidth: viewport.voi.windowWidth + delta.x / viewport.scale,
    windowCenter: viewport.voi.windowCenter + delta.y / viewport.scale,
  }
}

// TODO: 추가하면서 정리
type Control = Record<Drag, typeof pan | typeof adjust>

const control: Control = {
  pan,
  adjust,
}

export default control
