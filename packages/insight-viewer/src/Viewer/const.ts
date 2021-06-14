import { handleError } from '../utils/common/index'
import CircularProgress from '../components/CircularProgress'

export const DefaultProp = {
  onError: handleError,
  Progress: CircularProgress,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setHeader: (_request: Request): void => {},
}
