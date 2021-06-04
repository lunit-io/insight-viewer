import { createContext, useState } from 'react'
import { WithChildren } from '../../types'

interface ContextType {
  eventType: number
  setEventType: (n: number) => void
}

export const EVENT_TYPE = {
  draw: 0,
  pan: 1,
}

export const InitialState = EVENT_TYPE.draw

const Context = createContext<ContextType>({
  eventType: InitialState,
  setEventType: () => {},
})

export default Context

export function ContextProvider({ children }: WithChildren): JSX.Element {
  const [eventType, setEventType] = useState<number>(InitialState)
  return (
    <Context.Provider value={{ eventType, setEventType }}>
      {children}
    </Context.Provider>
  )
}
