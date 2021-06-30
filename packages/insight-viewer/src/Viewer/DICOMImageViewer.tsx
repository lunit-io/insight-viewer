import React, { useRef } from 'react'
import ViewerWrapper from '../components/ViewerWrapper'
import {
  WithChildren,
  Viewport,
  ViewerProp,
  ProgressComponent,
  OnViewportChange,
} from '../types'
import useCornerstone from '../hooks/useCornerstone'
import useImageLoader from '../hooks/useImageLoader'
import useViewportUpdate from '../hooks/useViewportUpdate'
import { Interaction } from '../hooks/useInteraction/types'
import useViewportInteraction from '../hooks/useInteraction/useViewportInteraction'
import setWadoImageLoader from '../utils/cornerstoneHelper/setWadoImageLoader'
import { DefaultProp } from './const'

export function DICOMImageViewer({
  imageId,
  onError = DefaultProp.onError,
  Progress = DefaultProp.Progress,
  requestInterceptor = DefaultProp.requestInterceptor,
  viewport,
  interaction,
  onViewportChange,
  children,
}: WithChildren<
  ViewerProp & {
    Progress?: ProgressComponent
    viewport?: Viewport
    onViewportChange?: OnViewportChange
    interaction?: Interaction
  }
>): JSX.Element {
  const elRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line no-underscore-dangle
  const initialViewportRef = useRef(viewport?._initial)

  useCornerstone(elRef.current)
  useImageLoader({
    imageId,
    element: elRef.current,
    onError,
    requestInterceptor,
    setLoader: () => setWadoImageLoader(onError),
    initialViewportRef,
    onViewportChange,
  })
  useViewportUpdate(elRef.current, viewport)
  useViewportInteraction({
    element: elRef.current,
    interaction,
    viewport,
    onViewportChange,
  })

  return (
    <ViewerWrapper ref={elRef} Progress={Progress}>
      {children}
    </ViewerWrapper>
  )
}
