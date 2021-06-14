import React, { useRef } from 'react'
import ViewerWrapper from '../components/ViewerWrapper'
import { WithChildren, ViewerProp } from '../types'
import useWebImageLoader from '../hooks/useWebImageLoader'
import { DefaultProp } from './const'

export function WebImageViewer({
  imageId,
  onError = DefaultProp.onError,
  setHeader = DefaultProp.setHeader,
  children,
}: WithChildren<Partial<ViewerProp>> & {
  imageId: string
}): JSX.Element {
  const elRef = useRef<HTMLDivElement>(null)
  useWebImageLoader({
    imageId,
    element: elRef.current,
    onError,
    setHeader,
  })

  return <ViewerWrapper ref={elRef}>{children}</ViewerWrapper>
}
