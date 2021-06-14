import React, { useRef } from 'react'
import ViewerWrapper from '../components/ViewerWrapper'
import { WithChildren, ViewerProp } from '../types'
import { handleError } from '../utils/common'
import useWebImageLoader from '../hooks/useWebImageLoader'

export function WebImageViewer({
  imageId,
  onError = handleError,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setHeader = _request => {},
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
