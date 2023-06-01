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
    // eslint-disable-next-line no-console
    console.error(e)
  },
  Progress: undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  requestInterceptor: (_request: Request): void => {},
  timeout: 60 * 1000,
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

export const DEFAULT_VIEWPORT_OPTIONS = {
  fitScale: true,
}

export const DEFAULT_VIEWPORT_VIEWER_REF = {
  current: null,
}

export const ERROR_MESSAGE = {
  ENABLED_ELEMENT_NOT_READY: 'enabledElement value is null, Please check the enabledElement value.',
} as const

/**
 * The Annotation Overlay z index should keep the highest value.
 * When using z index, please use a value below that value.
 */
export const ANNOTATION_OVERLAY_Z_INDEX = 10
