import React, { createContext } from 'react'
import { WithChildren, Viewport } from '../types'

export const ViewrportContextDefaultValue: Required<Viewport> = {
  invert: false,
  hflip: false,
  vflip: false,
}

const ViewportContext = createContext<Required<Viewport>>(
  ViewrportContextDefaultValue
)

export function ViewportContextProvider({
  invert = ViewrportContextDefaultValue.invert,
  hflip = ViewrportContextDefaultValue.hflip,
  vflip = ViewrportContextDefaultValue.vflip,
  children,
}: WithChildren<Viewport>): JSX.Element {
  return (
    <ViewportContext.Provider value={{ invert, hflip, vflip }}>
      {children}
    </ViewportContext.Provider>
  )
}

export default ViewportContext
