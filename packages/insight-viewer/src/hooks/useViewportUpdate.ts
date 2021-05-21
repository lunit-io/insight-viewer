import { useEffect } from 'react'
import { getViewport, setViewport } from '../utils/cornerstoneHelper'
import { Viewport } from '../types'
import { ViewrportContextDefaultValue } from '../Context/Viewport'

interface Prop {
  element: HTMLDivElement | null
  isLoaded: boolean
  viewport: Required<Viewport>
}

export default function useViewportUpdate({
  element,
  isLoaded,
  viewport: { invert, hflip, vflip } = ViewrportContextDefaultValue,
}: Prop): void {
  useEffect(() => {
    if (!element || !isLoaded) return undefined

    const viewport = getViewport(element)
    if (!viewport) return undefined

    setViewport(element, {
      ...viewport,
      invert,
      hflip,
      vflip,
    })

    return () => {}
  }, [element, isLoaded, invert, hflip, vflip])
}
