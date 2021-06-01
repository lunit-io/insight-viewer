import React, { createContext, useEffect, useState } from 'react'
import { WithChildren, Element } from '../types'
import { getViewport, EVENT } from '../utils/cornerstoneHelper'
import { formatViewport } from '../utils/common/formatViewport'

export interface Viewport {
  scale: number
  invert: boolean
  hflip: boolean
  vflip: boolean
  x: number
  y: number
  windowWidth: number
  windowCenter: number
}

export const ViewportContextDefaultValue: Viewport = {
  scale: 1,
  invert: false,
  hflip: false,
  vflip: false,
  x: 0,
  y: 0,
  windowWidth: 127,
  windowCenter: 256,
}

const ViewportContext = createContext<Viewport>(ViewportContextDefaultValue)

export function ViewportContextProvider({
  element,
  children,
}: WithChildren<{ element: Element }>): JSX.Element {
  const [viewport, setViewport] = useState<Viewport>(
    ViewportContextDefaultValue
  )

  useEffect(() => {
    if (!element) return undefined

    function onRender(): void {
      const v = getViewport(element as HTMLDivElement)
      setViewport(formatViewport(v))
    }

    element.addEventListener(EVENT.IMAGE_RENDERED, onRender)

    return () => {
      element.removeEventListener(EVENT.IMAGE_RENDERED, onRender)
    }
  }, [element])
  return (
    <ViewportContext.Provider value={viewport}>
      {children}
    </ViewportContext.Provider>
  )
}

export default ViewportContext
