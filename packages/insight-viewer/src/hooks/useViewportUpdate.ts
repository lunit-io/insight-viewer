import { useEffect } from 'react'
import { getViewport, setViewport } from '../utils/cornerstoneHelper'
import { formatCornerstoneViewport } from '../utils/common/formatViewport'
import { Element, Viewport } from '../types'

export default function useViewportUpdate(
  element: Element,
  newViewport?: Viewport
): void {
  useEffect(() => {
    if (!element || !newViewport) return
    const viewport = getViewport(<HTMLDivElement>element)
    if (viewport)
      setViewport(
        <HTMLDivElement>element,
        formatCornerstoneViewport(viewport, newViewport)
      )
  }, [element, newViewport])
}
