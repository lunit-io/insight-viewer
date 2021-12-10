import { EnabledElement } from 'cornerstone-core'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { WithChildren } from '../types'
import {
  setToPixelCoordinateSystem as setToPixelCoordinateSystemUtil,
  getEnabledElement,
} from '../utils/cornerstoneHelper'

export interface OverlayContext {
  enabledElement: EnabledElement | null
  setToPixelCoordinateSystem: (context: CanvasRenderingContext2D) => void
}

const contextDefaultValue: OverlayContext = {
  enabledElement: null,
  setToPixelCoordinateSystem: () => {},
}
const Context = createContext<OverlayContext>(contextDefaultValue)

export function OverlayContextProvider({
  element,
  hasImage,
  children,
}: WithChildren<{
  element: HTMLElement | null
  hasImage: boolean
}>): JSX.Element {
  const [enabledElement, setEnabledElement] = useState<EnabledElement | null>(
    null
  )
  function setToPixelCoordinateSystem(context: CanvasRenderingContext2D) {
    if (!enabledElement || !enabledElement.element) return
    setToPixelCoordinateSystemUtil(enabledElement, context)
  }

  useEffect(() => {
    if (!hasImage || !element) return
    const enabled = getEnabledElement(element)
    if (enabled) setEnabledElement(enabled)
  }, [element, hasImage])

  return (
    <Context.Provider value={{ setToPixelCoordinateSystem, enabledElement }}>
      {children}
    </Context.Provider>
  )
}

export function useOverlayContext(): OverlayContext {
  return useContext(Context)
}
