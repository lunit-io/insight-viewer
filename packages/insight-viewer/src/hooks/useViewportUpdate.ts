import { useEffect } from 'react'
import {
  getViewport,
  setViewport,
  CornerstoneViewport,
} from '../utils/cornerstoneHelper'
import { formatCornerstoneViewport } from '../utils/common/formatViewport'
import { Element, Viewport } from '../types'

export default function useViewportUpdate(
  element: Element,
  newViewport?: Viewport
): void {
  useEffect(() => {
    if (element && newViewport) {
      const viewport = getViewport(
        <HTMLDivElement>element
      ) as CornerstoneViewport

      setViewport(
        <HTMLDivElement>element,
        formatCornerstoneViewport(viewport, newViewport)
      )
    }
  }, [element, newViewport])
}
