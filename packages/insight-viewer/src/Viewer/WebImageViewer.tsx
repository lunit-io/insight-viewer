import React, { useRef } from 'react'
import ViewerWrapper from '../components/ViewerWrapper'
import { WithChildren } from '../types'
import useWebImageLoader from '../hooks/useWebImageLoader'

export function WebImageViewer(
  { imageId }: WithChildren<{ imageId: string }>
): JSX.Element {
  const elRef = useRef<HTMLDivElement>(null)
  useWebImageLoader(imageId, elRef)

  return <ViewerWrapper ref={elRef} />
}
