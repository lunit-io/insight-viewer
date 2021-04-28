import React, { useRef } from 'react'
import ViewerWrapper from '../components/ViewerWrapper'
import { WithChildren } from '../types'
import {
  useViewerLifecycle,
  useLoadImage,
  useWebImageLoader
} from '../hooks'

export function WebImageViewer(
  { imageId }: WithChildren<{ imageId: string }>
): JSX.Element {
  const elRef = useRef<HTMLDivElement>(null)
  useViewerLifecycle(elRef)
  useWebImageLoader()
  useLoadImage(imageId, elRef)

  return <ViewerWrapper ref={elRef} />
}
