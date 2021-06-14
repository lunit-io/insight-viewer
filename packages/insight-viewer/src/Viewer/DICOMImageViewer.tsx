import React, { useRef } from 'react'
import ViewerWrapper from '../components/ViewerWrapper'
import { WithChildren, ViewerProp, Progress as ProgressType } from '../types'
import useCornerstone from '../hooks/useCornerstone'
import useImageLoader from '../hooks/useImageLoader'
import { setWadoImageLoader } from '../utils/cornerstoneHelper'
import { DefaultProp } from './const'

export function DICOMImageViewer({
  imageId,
  onError = DefaultProp.onError,
  Progress = DefaultProp.Progress,
  setHeader = DefaultProp.setHeader,
  children,
}: WithChildren<
  ViewerProp & {
    Progress?: ProgressType
  }
>): JSX.Element {
  const elRef = useRef<HTMLDivElement>(null)
  useCornerstone(elRef.current)
  // TODO: 불필요한 매개변수 제거.
  useImageLoader({
    imageId,
    element: elRef.current,
    onError,
    setHeader,
    setLoader: () => setWadoImageLoader(onError),
  })

  return (
    <ViewerWrapper ref={elRef} Progress={Progress}>
      {children}
    </ViewerWrapper>
  )
}
