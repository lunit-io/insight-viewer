import consola from 'consola'
import { Viewport, BasicViewport } from '../../types'

export function handleError(e: Error): void {
  consola.error(e)
}

export function isValidViewport(viewport: Viewport): viewport is BasicViewport {
  return (
    viewport.scale !== undefined &&
    viewport.invert !== undefined &&
    viewport.hflip !== undefined &&
    viewport.vflip !== undefined &&
    viewport.x !== undefined &&
    viewport.y !== undefined &&
    viewport.windowWidth !== undefined &&
    viewport.windowCenter !== undefined
  )
}
