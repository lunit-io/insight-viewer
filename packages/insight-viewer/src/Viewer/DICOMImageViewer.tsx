import React, { useRef } from 'react'
import ViewerWrapper from '../components/ViewerWrapper'
import { WithChildren } from '../types'
import {
  useViewerLifecycle,
  useLoadImage,
  useWADOImageLoader
} from '../hooks'

export function DICOMImageViewer(
  { imageId }: WithChildren<{ imageId: string }>
): JSX.Element {
  const elRef = useRef<HTMLDivElement>(null)
  useViewerLifecycle(elRef)
  useWADOImageLoader()
  useLoadImage(imageId, elRef)

  return <ViewerWrapper ref={elRef} />
}
