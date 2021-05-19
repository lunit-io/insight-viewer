import { createContext } from 'react'
import { handleError } from '../utils/common/index'
import CircularProgress from '../components/CircularProgress'
import { ContextProp } from '../types'

export const ContextDefaultValue: ContextProp = {
  onError: handleError,
  Progress: CircularProgress,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setHeader: _request => {},
}

const Context = createContext<ContextProp>(ContextDefaultValue)

export default Context
