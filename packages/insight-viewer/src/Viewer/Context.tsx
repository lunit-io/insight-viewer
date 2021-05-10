import { createContext } from 'react'
import { handleError } from '../utils/common/index'

export interface ContextData {
  onError: (e: Error) => void
}

export const ContextDefaultValue: ContextData = {
  onError: handleError,
}

const Context = createContext<ContextData>(ContextDefaultValue)

export default Context
