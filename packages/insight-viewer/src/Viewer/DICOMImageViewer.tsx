import React, { useRef } from 'react'
import ViewerWrapper from '../components/ViewerWrapper'
import { WithChildren, ViewerProp, Progress as ProgressType } from '../types'
import useDICOMImageLoader from '../hooks/useDICOMImageLoader'
import { DefaultProp } from './const'

export function DICOMImageViewer({
  imageId,
  onError = DefaultProp.onError,
  Progress = DefaultProp.Progress,
  setHeader = DefaultProp.setHeader,
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
    onError,
    setHeader,
  })

  return (
    <ViewerWrapper ref={elRef} Progress={Progress}>
      {children}
    </ViewerWrapper>
  )
}
