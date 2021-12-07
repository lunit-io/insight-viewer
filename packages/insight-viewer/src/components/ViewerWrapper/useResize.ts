import React, { useCallback } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import { resize } from '../../utils/cornerstoneHelper'
import { Element } from '../../types'

export default function useResize(ref: React.ForwardedRef<HTMLDivElement>): {
  resizeRef: React.RefObject<HTMLDivElement>
  width: number | undefined
  height: number | undefined
} {
  const targetRef = <React.MutableRefObject<Element>>ref
  const element = targetRef?.current

  const handleResize = useCallback(() => {
    if (!element) return
    resize(element)
  }, [element])

  const {
    ref: resizeRef,
    width,
    height,
  } = useResizeDetector({
    targetRef,
    onResize: handleResize,
    skipOnMount: false,
  })

  return { resizeRef, width, height }
}
