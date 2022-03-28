import consola from 'consola'

export const IMAGE_LOADER_SCHEME = {
  WADO: 'wadouri',
  DICOMFILE: 'dicomfile',
  WEB: 'web', // for cornerstone-web-image-loader
} as const

export const LOADER_TYPE = {
  DICOM: 'dicom', // for cornerstone-wado-image-loader
  WEB: 'web', // for cornerstone-web-image-loader
} as const

export const CONFIG = {
  onError: function handleError(e: Error): void {
    consola.error(e)
  },
  Progress: undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  requestInterceptor: (_request: Request): void => {},
}

export const LOADING_STATE = {
  INITIAL: 'initial',
  LOADING: 'loading',
  SUCCESS: 'success',
  FAIL: 'fail',
} as const

// This is the default initial viewport value and is used as placeholder.
export const BASE_VIEWPORT = {
  scale: 0,
  invert: false,
  hflip: false,
  vflip: false,
  rotation: 0,
  x: 0,
  y: 0,
  windowWidth: 0,
  windowCenter: 0,
}

export const ERROR_MESSAGE = {
  ENABLED_ELEMENT_NOT_READY: 'enabledElement value is null, Please check the enabledElement value.',
} as const

export const RULER_TEXT_POSITION_SPACING = {
  x: 10,
  y: 20,
}

// The ruler min length is 0.1mm
export const RULER_MIN_LENGTH = 0.1

export const EDIT_CIRCLE_RADIUS = 4
