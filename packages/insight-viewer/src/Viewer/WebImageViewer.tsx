import React, { useRef } from 'react'
import ViewerWrapper from '../components/ViewerWrapper'
import { WithChildren } from '../types'
import useCornerstone from '../hooks/useCornerstone'
import useImageDisplay from '../hooks/useImageDisplay'
import { ViewerProp } from './types'

export function WebImageViewer({
  image,
  children,
}: WithChildren<ViewerProp>): JSX.Element {
  const elRef = useRef<HTMLDivElement>(null)
  // Enable/disable cornerstone.js.
  useCornerstone(elRef.current)
  // Load and display image.
  useImageDisplay({
    element: elRef.current,
    image,
  })

  return <ViewerWrapper ref={elRef}>{children}</ViewerWrapper>
}
