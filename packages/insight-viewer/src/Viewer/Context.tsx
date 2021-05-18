import { createContext } from 'react'
import { handleError } from '../utils/common/index'
import CircularProgress from '../components/CircularProgress'
import { OnError, Progress, SetHeader } from '../types'

export interface ContextData {
  onError: OnError
  Progress: Progress
  setHeader: SetHeader
  images: string[]
}

export const ContextDefaultValue: ContextData = {
  onError: handleError,
  Progress: CircularProgress,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setHeader: _request => {},
  images: [],
}

const Context = createContext<ContextData>(ContextDefaultValue)

export default Context
