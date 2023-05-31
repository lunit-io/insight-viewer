/**
 * @fileoverview Update cornerstone.js viewport when Viewer's viewport prop changes.
 */
import { useEffect } from 'react'
import {
  getViewport,
  setViewport,
  getDefaultViewportForImage,
  formatCornerstoneViewport,
  formatViewerViewport,
  CornerstoneImage,
} from '../utils/cornerstoneHelper'
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
export default function useViewportUpdate({ element, image, viewport: newViewportProp, onViewportChange }: Prop): void {
  useEffect(() => {
    if (!element || !image || !newViewportProp) return

    const defaultViewport = getDefaultViewportForImage(element, image)
    const willReset = newViewportProp?._resetViewport && defaultViewport
    const viewport = willReset ? defaultViewport : getViewport(<HTMLDivElement>element)
    const newViewportOptions = newViewportProp._viewportOptions

    /**
     * If the viewport scale is 0,
     * it will not be drawn on the screen.
     */
    if (!viewport || newViewportProp.scale === 0) return

    let elementUpdatedViewport: Viewport = newViewportProp
    let updatedNewViewport: Viewport = newViewportProp

    /**
     * If the fitScale option is true,
     * the scale will not decrease below the default viewport.
     * This behavior is the default behavior.
     */
    if (
      onViewportChange &&
      newViewportProp.isLegacyViewport &&
      newViewportOptions.fitScale &&
      newViewportProp.scale < defaultViewport.scale
    ) {
      elementUpdatedViewport = { ...newViewportProp, scale: defaultViewport.scale }
      updatedNewViewport = { ...formatViewerViewport(viewport), ...elementUpdatedViewport }
    }

    setViewport(<HTMLDivElement>element, formatCornerstoneViewport(viewport, elementUpdatedViewport))

    if (onViewportChange && newViewportProp.isLegacyViewport) {
      // When resetting, update Viewer's viewport prop
      if (willReset) {
        onViewportChange({
          isLegacyViewport: true,
          ...formatViewerViewport(defaultViewport),
          ...(newViewportProp?._resetViewport ?? {}),
          _viewportOptions: newViewportOptions,
        })
      } else {
        onViewportChange(updatedNewViewport)
      }
    }
  }, [element, image, newViewportProp, onViewportChange])
}
