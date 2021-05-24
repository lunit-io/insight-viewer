import React, { createContext } from 'react'
import { WithChildren, Viewport } from '../types'

export const ViewrportContextDefaultValue: Required<Viewport> = {
  invert: false,
  hflip: false,
  vflip: false,
}

const ViewportContext = createContext<Viewport>(ViewrportContextDefaultValue)

export function ViewportContextProvider({
  viewport = ViewrportContextDefaultValue,
  children,
}: WithChildren<{ viewport?: Viewport }>): JSX.Element {
  return (
    <ViewportContext.Provider value={viewport}>
      {children}
    </ViewportContext.Provider>
  )
}

export default ViewportContext
