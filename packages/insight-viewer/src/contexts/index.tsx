import React, { createContext, useContext } from 'react'
import { WithChildren } from '../types'
import {
  setToPixelCoordinateSystem as setToPixelCoordinateSystemUtil,
  getEnabledElement,
} from '../utils/cornerstoneHelper'

interface OverlayContextState {
  setToPixelCoordinateSystem: (context: CanvasRenderingContext2D) => void
}

const contextDefaultValue: OverlayContextState = {
  setToPixelCoordinateSystem: () => {},
}
const OverlayContext = createContext<OverlayContextState>(contextDefaultValue)

export function OverlayContextProvider({
  element,
  children,
}: WithChildren<{
  element: HTMLElement | null
}>): JSX.Element {
  function setToPixelCoordinateSystem(context: CanvasRenderingContext2D) {
    if (!element) return
    const enabledElement = getEnabledElement(element)
    setToPixelCoordinateSystemUtil(enabledElement, context)
  }

  return (
    <OverlayContext.Provider value={{ setToPixelCoordinateSystem }}>
      {children}
    </OverlayContext.Provider>
  )
}

export function useOverlayContext(): OverlayContextState {
  return useContext(OverlayContext)
}
