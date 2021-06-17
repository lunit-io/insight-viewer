import { useEffect } from 'react'
import {
  getViewport,
  setViewport,
  CornerstoneViewport,
} from '../utils/cornerstoneHelper'
import { formatCornerstoneViewport } from '../utils/common/formatViewport'
import { Element } from '../types'
import { Viewport } from '../Context/Viewport/types'

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
