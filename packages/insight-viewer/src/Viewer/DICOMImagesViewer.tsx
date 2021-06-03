import React, { useRef } from 'react'
import ViewerWrapper from '../components/ViewerWrapper'
import { WithChildren } from '../types'
import useDICOMImageLoader from '../hooks/useDICOMImageLoader'
import usePrefetch from '../hooks/usePrefetch'
import useFrame from '../hooks/useFrame'
import { VIEWER_TYPE } from '../const'

export function DICOMImagesViewer({
  imageIds,
  initial,
  children,
}: WithChildren<{ imageIds: string[]; initial: number }>): JSX.Element {
  const elRef = useRef<HTMLDivElement>(null)
  usePrefetch(imageIds)
  useFrame(elRef.current, imageIds)
  useDICOMImageLoader({
    imageId: imageIds[initial],
    element: elRef.current,
    isSingleImage: false,
  })

  return (
    <ViewerWrapper ref={elRef} type={VIEWER_TYPE.DICOM}>
      {children}
    </ViewerWrapper>
  )
}
