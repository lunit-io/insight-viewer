import React, { useRef } from 'react'
import ViewerWrapper from '../components/ViewerWrapper'
import { WithChildren, ViewerProp, Progress as ProgressType } from '../types'
import useDICOMImageLoader from '../hooks/useDICOMImageLoader'
import { handleError } from '../utils/common'
import CircularProgress from '../components/CircularProgress'

export function DICOMImagesViewer({
  imageId,
  onError = handleError,
  Progress = CircularProgress,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setHeader = _request => {},
  children,
}: WithChildren<
  Partial<ViewerProp> & {
    Progress?: ProgressType
  }
> & {
  imageId: string
}): JSX.Element {
  const elRef = useRef<HTMLDivElement>(null)

  useDICOMImageLoader({
    imageId,
    element: elRef.current,
    isSingleImage: false,
    onError,
    setHeader,
  })

  return (
    <ViewerWrapper ref={elRef} Progress={Progress}>
      {children}
    </ViewerWrapper>
  )
}
