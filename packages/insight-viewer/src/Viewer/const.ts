import { handleError } from '../utils/common/index'

export const DefaultProp = {
  onError: handleError,
  Progress: undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  requestInterceptor: (_request: Request): void => {},
}
