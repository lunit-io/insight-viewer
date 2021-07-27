import React, { useRef } from 'react'
import ViewerWrapper from '../components/ViewerWrapper'
import { WithChildren, ViewerProp } from '../types'
import useCornerstone from '../hooks/useCornerstone'
import useImageLoad from '../hooks/useImageLoad'
import useImageDisplay from '../hooks/useImageDisplay'
import setWebImageLoader from '../utils/cornerstoneHelper/setWebImageLoader'
import { DefaultProp } from './const'

export function WebImageViewer({
  imageId,
  onError = DefaultProp.onError,
  requestInterceptor = DefaultProp.requestInterceptor,
  children,
}: WithChildren<ViewerProp>): JSX.Element {
  const elRef = useRef<HTMLDivElement>(null)
  // Enable/disable cornerstone.js.
  useCornerstone(elRef.current)
  const { /* loadingStatus, */ image } = useImageLoad({
    imageId,
    requestInterceptor,
    setLoader: () => setWebImageLoader(onError),
    onError,
  })
  // Load and display image.
  useImageDisplay({
    element: elRef.current,
    image,
  })

  return <ViewerWrapper ref={elRef}>{children}</ViewerWrapper>
}
