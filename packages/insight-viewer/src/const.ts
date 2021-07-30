import { Viewport } from './types'
import { handleError } from './utils/common'

export const DefaultViewport: Viewport = {
  scale: 0,
  invert: false,
  hflip: false,
  vflip: false,
  x: 0,
  y: 0,
  windowWidth: 0,
  windowCenter: 0,
}

export const LOADER_TYPE = {
  Dicom: 'Dicom',
  Web: 'Web',
} as const

export const CONFIG = {
  onError: handleError,
  Progress: undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  requestInterceptor: (_request: Request): void => {},
}
