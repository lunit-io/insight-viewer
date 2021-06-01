import React, { useRef } from 'react'
import ViewerWrapper from '../components/ViewerWrapper'
import { WithChildren } from '../types'
import useDICOMImageLoader from '../hooks/useDICOMImageLoader'
import { VIEWER_TYPE } from '../const'

export function DICOMImagesViewer({
  imageId,
  children,
}: WithChildren<{ imageId: string }>): JSX.Element {
  const elRef = useRef<HTMLDivElement>(null)

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
