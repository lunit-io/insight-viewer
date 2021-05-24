import React, { useRef } from 'react'
import ViewerWrapper from '../components/ViewerWrapper'
import { WithChildren } from '../types'
import useDICOMImageLoader from '../hooks/useDICOMImageLoader'
import usePrefetch from '../hooks/usePrefetch'
import { VIEWER_TYPE } from '../const'

export function DICOMImagesViewer({
  imageId,
  images,
  children,
}: WithChildren<{ imageId: string; images: string[] }>): JSX.Element {
  const elRef = useRef<HTMLDivElement>(null)
  usePrefetch(images)
  useDICOMImageLoader({
    imageId,
    element: elRef.current,
    isSingleImage: false,
  })

  return (
    <ViewerWrapper ref={elRef} type={VIEWER_TYPE.DICOM}>
      {children}
    </ViewerWrapper>
  )
}
