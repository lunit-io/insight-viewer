import React, { useRef, useEffect } from 'react'
import ViewerWrapper from '../components/ViewerWrapper'
import {
  WithChildren,
  Viewport,
  ViewerProp,
  ProgressComponent,
  OnViewportChange,
} from '../types'
import useCornerstone from '../hooks/useCornerstone'
import useImageLoadAndDisplay from '../hooks/useImageLoadAndDisplay'
import useViewportUpdate from '../hooks/useViewportUpdate'
import { Interaction } from '../hooks/useInteraction/types'
import useViewportInteraction from '../hooks/useInteraction/useViewportInteraction'
import useInitialViewport from '../hooks/useInitialViewport'
import { SetFrame } from '../hooks/useMultiframe/useFrame'
import setWadoImageLoader from '../utils/cornerstoneHelper/setWadoImageLoader'
import useImageLoader from '../hooks/useImageLoader'
import { DefaultProp } from './const'

export function DICOMImageViewer({
  imageId,
  onError = DefaultProp.onError,
  Progress,
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
    onFrameChange?: SetFrame
    interaction?: Interaction
  }
>): JSX.Element {
  const elRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef(viewport)
  const initialViewporRef = useInitialViewport()
  // Load cornerstone image loader.
  const hasLoader = useImageLoader(setWadoImageLoader, onError)
  // Enable/disable cornerstone.js.
  useCornerstone(elRef.current)
  // Load and display image.
  useImageLoadAndDisplay({
    imageId,
    element: elRef.current,
    onError,
    requestInterceptor,
    hasLoader,
    viewportRef,
    onViewportChange,
  })
  // Update cornerstone viewport when viewport prop changes.
  useViewportUpdate({
    element: elRef.current,
    viewport,
    initialViewport: initialViewporRef?.current,
    onViewportChange,
  })
  // Update cornerstone viewport on user interaction.
  useViewportInteraction({
    element: elRef.current,
    interaction,
    viewport,
    onViewportChange,
  })

  useEffect(() => {
    viewportRef.current = viewport
  }, [viewport])

  return (
    <ViewerWrapper ref={elRef} Progress={Progress}>
      {children}
    </ViewerWrapper>
  )
}
