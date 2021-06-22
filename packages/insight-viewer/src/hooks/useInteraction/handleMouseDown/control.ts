import { CornerstoneViewport } from '../../../utils/cornerstoneHelper'
import { Coord } from './types'
import { MOUSE_MOVE_DOWN } from '../const'

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

// TODO
function contour(
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

const control: Record<
  keyof typeof MOUSE_MOVE_DOWN,
  typeof pan | typeof adjust | typeof contour
> = {
  pan,
  adjust,
  contour,
}

export default control
