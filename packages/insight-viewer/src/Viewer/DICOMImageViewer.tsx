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
import { SetFrame } from '../hooks/useMultiframe/useFrame'
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
  onFrameChange,
  children,
}: WithChildren<
  ViewerProp & {
    Progress?: ProgressComponent
    viewport?: Viewport
    onViewportChange?: OnViewportChange
    onFrameChange?: SetFrame
    interaction?: Interaction
  }
>): JSX.Element {
  const elRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line no-underscore-dangle
  const initialViewportRef = useRef(viewport?._initial)
  // enable/disable cornerstone.js
  useCornerstone(elRef.current)
  // enable cornerstone.js image loader and load/display image
  useImageLoader({
    imageId,
    element: elRef.current,
    onError,
    requestInterceptor,
    setLoader: () => setWadoImageLoader(onError),
    initialViewportRef,
    onViewportChange,
  })
  // update cornerstone viewport when viewport prop changes
  useViewportUpdate(elRef.current, viewport)
  // update cornerstone viewport on user interaction
  useViewportInteraction({
    element: elRef.current,
    interaction,
    viewport,
    onViewportChange,
    onFrameChange,
  })

  return (
    <ViewerWrapper ref={elRef} Progress={Progress}>
      {children}
    </ViewerWrapper>
  )
}
