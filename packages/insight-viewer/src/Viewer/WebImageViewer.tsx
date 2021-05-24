import React, { useRef } from 'react'
import ViewerWrapper from '../components/ViewerWrapper'
import { WithChildren } from '../types'
import useWebImageLoader from '../hooks/useWebImageLoader'
import { VIEWER_TYPE } from '../const'

export function WebImageViewer({
  imageId,
  children,
}: WithChildren<{ imageId: string }>): JSX.Element {
  const elRef = useRef<HTMLDivElement>(null)
  useWebImageLoader(imageId, elRef.current)

  return (
    <ViewerWrapper ref={elRef} type={VIEWER_TYPE.WEB}>
      {children}
    </ViewerWrapper>
  )
}
