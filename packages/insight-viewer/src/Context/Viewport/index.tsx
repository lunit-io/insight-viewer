import React, { createContext, useEffect, useState } from 'react'
import { WithChildren, Element } from '../../types'
import { getViewport, EVENT } from '../../utils/cornerstoneHelper'
import { formatViewport } from '../../utils/common/formatViewport'
import { Viewport } from './types'
import { ViewportContextDefaultValue } from './const'

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
      const currentViewport = getViewport(element as HTMLDivElement)
      setViewport(formatViewport(currentViewport))
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
