import consola from 'consola'

export const LOADER_TYPE = {
  Dicom: 'Dicom',
  Web: 'Web',
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
