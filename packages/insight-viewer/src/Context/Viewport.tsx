import React, { createContext, useEffect, useState } from 'react'
import { WithChildren, Element } from '../types'
import {
  getViewport,
  EVENT,
  CornerstoneViewport,
} from '../utils/cornerstoneHelper'

const ViewportContext =
  createContext<CornerstoneViewport | undefined>(undefined)

export type Viewport = CornerstoneViewport | undefined

export function ViewportContextProvider({
  element,
  children,
}: WithChildren<{ element: Element }>): JSX.Element {
  const [viewport, setViewport] = useState<Viewport>(undefined)

  useEffect(() => {
    if (!element) return undefined

    function onRender(): void {
      setViewport(getViewport(element as HTMLDivElement))
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
