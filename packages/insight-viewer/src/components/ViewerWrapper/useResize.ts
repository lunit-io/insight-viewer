import React, { useCallback } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import { resize, getViewport } from '../../utils/cornerstoneHelper'
import { formatViewport } from '../../utils/common/formatViewport'
import { Element, OnViewportChange } from '../../types'

export default function useResize(
  ref: React.ForwardedRef<HTMLDivElement>,
  onViewportChange: OnViewportChange | undefined
): {
  resizeRef: React.RefObject<HTMLDivElement>
} {
  const targetRef = <React.MutableRefObject<Element>>ref
  const element = targetRef?.current

  const handleResize = useCallback(() => {
    if (!element) return
    resize(element)
    // update Viewer's viewport prop to change
    if (onViewportChange) {
      const viewport = getViewport(element)
      // for resolving issue which is "Cannot update a component while rendering a different component" warning
      requestAnimationFrame(() => onViewportChange(formatViewport(viewport)))
    }
  }, [element, onViewportChange])

  const { ref: resizeRef } = useResizeDetector({
    targetRef,
    onResize: handleResize,
    skipOnMount: false,
  })

  return { resizeRef }
}
