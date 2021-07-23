import React, { useRef } from 'react'
import ViewerWrapper from '../components/ViewerWrapper'
import { WithChildren, ViewerProp } from '../types'
import useCornerstone from '../hooks/useCornerstone'
import useImageLoadAndDisplay from '../hooks/useImageLoadAndDisplay'
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
  // Load and display image.
  useImageLoadAndDisplay({
    imageId,
    element: elRef.current,
    onError,
    requestInterceptor,
    setLoader: () => setWebImageLoader(onError),
  })

  return <ViewerWrapper ref={elRef}>{children}</ViewerWrapper>
}
