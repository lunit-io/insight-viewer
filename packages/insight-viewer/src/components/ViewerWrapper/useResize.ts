import React, { useCallback } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import { resize } from '../../utils/cornerstoneHelper'
import { Element } from '../../types'

export default function useResize(
  ref: React.ForwardedRef<HTMLDivElement>
): {
  resizeRef: React.RefObject<HTMLDivElement>
} {
  const element = (ref as React.MutableRefObject<Element>)?.current

  const handleResize = useCallback(() => {
    if (!element) return undefined
    return resize(element)
  }, [element])

  const { ref: resizeRef } = useResizeDetector({
    targetRef: ref as React.MutableRefObject<HTMLDivElement>,
    onResize: handleResize,
    skipOnMount: false,
  })

  return { resizeRef }
}
