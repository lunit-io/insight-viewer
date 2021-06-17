import React, { useRef, useEffect } from 'react'
import ViewerWrapper from '../components/ViewerWrapper'
import {
  WithChildren,
  ViewerProp,
  ProgressComponent,
  OnViewportChange,
} from '../types'
import { Viewport } from '../Context/Viewport/types'
import useCornerstone from '../hooks/useCornerstone'
import useImageLoader from '../hooks/useImageLoader'
import setWadoImageLoader from '../utils/cornerstoneHelper/setWadoImageLoader'
import { viewportMessage } from '../utils/messageService/viewport'
import { DefaultProp } from './const'

export function DICOMImageViewer({
  imageId,
  onError = DefaultProp.onError,
  Progress = DefaultProp.Progress,
  requestInterceptor = DefaultProp.requestInterceptor,
  viewport,
  onViewportChange,
  children,
}: WithChildren<
  ViewerProp & {
    Progress?: ProgressComponent
    viewport?: Viewport
    onViewportChange?: OnViewportChange
  }
>): JSX.Element {
  const elRef = useRef<HTMLDivElement>(null)
  useCornerstone(elRef.current)

  useImageLoader({
    imageId,
    element: elRef.current,
    onError,
    requestInterceptor,
    setLoader: () => setWadoImageLoader(onError),
    viewport,
    onViewportChange,
  })

  useEffect(() => {
    if (viewport) viewportMessage.sendMessage(viewport)
  }, [viewport])

  return (
    <ViewerWrapper ref={elRef} Progress={Progress}>
      {children}
    </ViewerWrapper>
  )
}
