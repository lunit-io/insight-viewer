/**
 * @fileoverview Update cornerstone.js viewport when Viewer's viewport prop changes.
 */
import { useEffect } from 'react'
import {
  getViewport,
  setViewport,
  CornerstoneViewport,
} from '../utils/cornerstoneHelper'
import {
  formatCornerstoneViewport,
  formatViewport,
} from '../utils/common/formatViewport'
import { Element, Viewport, OnViewportChange } from '../types'

interface Prop {
  element: Element
  viewport?: Viewport
  defaultViewport: CornerstoneViewport | undefined
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
  viewport: newViewportProp,
  defaultViewport,
  onViewportChange,
}: Prop): void {
  useEffect(() => {
    if (!element || !newViewportProp) return

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
        ...formatViewport(defaultViewport),
        ...(newViewportProp?._resetViewport ?? {}),
      })
    }
  }, [element, newViewportProp, defaultViewport, onViewportChange])
}
