import React, { useRef } from 'react'
import ViewerWrapper from '../components/ViewerWrapper'
import { WithChildren, ViewerProp } from '../types'
import useCornerstone from '../hooks/useCornerstone'
import useImageLoadAndDisplay from '../hooks/useImageLoadAndDisplay'
import setWebImageLoader from '../utils/cornerstoneHelper/setWebImageLoader'
import useImageLoader from '../hooks/useImageLoader'
import { DefaultProp } from './const'

export function WebImageViewer({
  imageId,
  onError = DefaultProp.onError,
  requestInterceptor = DefaultProp.requestInterceptor,
  children,
}: WithChildren<ViewerProp>): JSX.Element {
  const elRef = useRef<HTMLDivElement>(null)
  // Load cornerstone image loader.
  const hasLoader = useImageLoader(setWebImageLoader, onError)
  // Enable/disable cornerstone.js.
  useCornerstone(elRef.current)
  // Load and display image.
  useImageLoadAndDisplay({
    imageId,
    element: elRef.current,
    onError,
    requestInterceptor,
    hasLoader,
  })

  return <ViewerWrapper ref={elRef}>{children}</ViewerWrapper>
}
