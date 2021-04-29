import React, { useRef } from 'react'
import ViewerWrapper from '../components/ViewerWrapper'
import { WithChildren } from '../types'
import useDICOMImageLoader from '../hooks/useDICOMImageLoader'

export function DICOMImageViewer({
  imageId,
}: WithChildren<{ imageId: string }>): JSX.Element {
  const elRef = useRef<HTMLDivElement>(null)
  useDICOMImageLoader(imageId, elRef.current)

  return <ViewerWrapper ref={elRef} />
}
