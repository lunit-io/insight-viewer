/**
 * @fileoverview Update cornerstone.js viewport when Viewer's viewport prop changes.
 */
import { useEffect } from 'react'
import {
  getViewport,
  setViewport,
  getDefaultViewportForImage,
  CornerstoneImage,
} from '../utils/cornerstoneHelper'
import {
  formatCornerstoneViewport,
  formatViewerViewport,
} from '../utils/common/formatViewport'
import { Element, Viewport, OnViewportChange } from '../types'

interface Prop {
  element: Element
  image: CornerstoneImage | undefined
  viewport?: Viewport
  onViewportChange?: OnViewportChange
}

/**
 * @param element The HTML Element enabled for Cornerstone.
 * @param viewport The Viewer's viewport prop.
 * @param initialViewport The user-defined initial viewport of a Viewer.
 * @param onViewportChange The Viewer's viewport setter prop.
 */
export default function useViewportUpdate({
  element,
  image,
  viewport: newViewportProp,
  onViewportChange,
}: Prop): void {
  useEffect(() => {
    if (!element || !image || !newViewportProp) return
    const defaultViewport = getDefaultViewportForImage(element, image)
    const willReset = newViewportProp?._resetViewport && defaultViewport
    const viewport = willReset
      ? defaultViewport
      : getViewport(<HTMLDivElement>element)

    if (!viewport) return

    setViewport(
      <HTMLDivElement>element,
      formatCornerstoneViewport(viewport, newViewportProp)
    )

    // When resetting, update Viewer's viewport prop
    if (willReset && onViewportChange) {
      onViewportChange({
        ...formatViewerViewport(defaultViewport),
        ...(newViewportProp?._resetViewport ?? {}),
      })
    }
  }, [element, image, newViewportProp, onViewportChange])
}
