import { Viewport } from '../../types'
import { DEFAULT_VIEWPORT_OPTIONS } from '../../const'

export const DefaultViewport: Viewport = {
  scale: 0,
  invert: false,
  hflip: false,
  vflip: false,
  rotation: 0,
  x: 0,
  y: 0,
  windowWidth: 0,
  windowCenter: 0,
  _viewportOptions: DEFAULT_VIEWPORT_OPTIONS,
}

export const ERROR_UNKNOWN = 'error unknown'

export const IMAGER_PIXEL_SPACING = 'x00181164'
