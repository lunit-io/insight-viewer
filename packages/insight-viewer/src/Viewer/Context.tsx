import { createContext } from 'react'
import { handleError } from '../utils/common/index'
import CircularProgress from '../components/CircularProgress'
import { OnError, Progress } from '../types'

export interface ContextData {
  onError: OnError
  Progress: Progress
}

export const ContextDefaultValue: ContextData = {
  onError: handleError,
  Progress: CircularProgress,
}

const Context = createContext<ContextData>(ContextDefaultValue)

export default Context
