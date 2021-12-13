import { EnabledElement } from 'cornerstone-core'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { WithChildren, Viewport } from '../types'
import { BASE_VIEWPORT } from '../const'
import {
  setToPixelCoordinateSystem as setToPixelCoordinateSystemUtil,
  getEnabledElement,
} from '../utils/cornerstoneHelper'

export interface OverlayContext {
  enabledElement: EnabledElement | null
  setToPixelCoordinateSystem: (context: CanvasRenderingContext2D) => void
  viewport: Viewport
}

const contextDefaultValue: OverlayContext = {
  enabledElement: null,
  setToPixelCoordinateSystem: () => {},
  viewport: BASE_VIEWPORT,
}
const Context = createContext<OverlayContext>(contextDefaultValue)

export function OverlayContextProvider({
  element,
  imageEnabled,
  viewport = BASE_VIEWPORT,
  children,
}: WithChildren<{
  element: HTMLElement | null
  imageEnabled: boolean
  viewport: Viewport | undefined
}>): JSX.Element {
  const [enabledElement, setEnabledElement] = useState<EnabledElement | null>(
    null
  )
  function setToPixelCoordinateSystem(context: CanvasRenderingContext2D) {
    if (!enabledElement || !enabledElement.element) return
    setToPixelCoordinateSystemUtil(enabledElement, context)
  }

  useEffect(() => {
    if (!imageEnabled || !element) return
    const _enabledElement = getEnabledElement(element)
    if (_enabledElement) setEnabledElement(_enabledElement)
  }, [element, imageEnabled])

  return (
    <Context.Provider
      value={{ setToPixelCoordinateSystem, enabledElement, viewport }}
    >
      {children}
    </Context.Provider>
  )
}

export function useOverlayContext(): OverlayContext {
  return useContext(Context)
}
