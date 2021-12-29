import React, { createContext, useContext, useEffect, useState } from 'react'
import { WithChildren, Viewport, Point } from '../types'
import { BASE_VIEWPORT, ERROR_MESSAGE } from '../const'
import {
  EnabledElement,
  PixelCoordinate,
} from '../utils/cornerstoneHelper/types'
import {
  pixelToCanvas as pixelToCanvasUtil,
  setToPixelCoordinateSystem as setToPixelCoordinateSystemUtil,
  getEnabledElement,
} from '../utils/cornerstoneHelper'

export interface OverlayContext {
  enabledElement: EnabledElement | null
  setToPixelCoordinateSystem: (context: CanvasRenderingContext2D) => void
  pixelToCanvas: (point: Point) => Point
  viewport: Viewport
}

const contextDefaultValue: OverlayContext = {
  enabledElement: null,
  setToPixelCoordinateSystem: () => {},
  pixelToCanvas: () => ({} as Point),
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
  const [, setUpdateCount] = React.useState(0)

  function setToPixelCoordinateSystem(context: CanvasRenderingContext2D) {
    if (!enabledElement?.element) {
      throw new Error(ERROR_MESSAGE.ENABLED_ELEMENT_NOT_READY)
    }

    context.setTransform(1, 0, 0, 1, 0, 0)
    setToPixelCoordinateSystemUtil(enabledElement, context)
  }

  function pixelToCanvas([xPosition, yPosition]: Point): Point {
    if (!enabledElement?.element) {
      throw new Error(ERROR_MESSAGE.ENABLED_ELEMENT_NOT_READY)
    }

    const pixelCoordinate: PixelCoordinate = {
      x: xPosition,
      y: yPosition,
      _pixelCoordinateBrand: 'pixel',
    }
    const { x, y } = pixelToCanvasUtil(enabledElement.element, pixelCoordinate)

    return [x, y]
  }

  // when viewport prop is changed, Overlay context should be changed as well.
  // new viewport props update cornerstone's viewport asynchronously.
  useEffect(() => {
    if (!enabledElement) return
    setUpdateCount(prev => prev + 1)
  }, [viewport, enabledElement])

  useEffect(() => {
    if (!imageEnabled || !element) return
    const _enabledElement = getEnabledElement(element)
    if (_enabledElement) setEnabledElement(_enabledElement)
  }, [element, imageEnabled])

  return (
    <Context.Provider
      value={{
        setToPixelCoordinateSystem,
        pixelToCanvas,
        enabledElement,
        viewport,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useOverlayContext(): OverlayContext {
  return useContext(Context)
}
