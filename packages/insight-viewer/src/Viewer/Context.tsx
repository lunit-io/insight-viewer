import { createContext } from 'react'
import { defaultHttpErrorHandler } from '../utils/common/index'
import { HTTPError } from '../types'

export interface ContextData {
  onError: (e: HTTPError) => void
}

export const ContextDefaultValue: ContextData = {
  onError: defaultHttpErrorHandler,
}

const Context = createContext<ContextData>(ContextDefaultValue)

export default Context
