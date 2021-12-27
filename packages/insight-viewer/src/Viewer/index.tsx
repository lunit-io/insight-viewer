import React, { useRef, useEffect } from 'react'
import ViewerWrapper from '../components/ViewerWrapper'
import { WithChildren, Viewport } from '../types'
import { BASE_VIEWPORT } from '../const'
import useCornerstone from '../hooks/useCornerstone'
import useImageDisplay from '../hooks/useImageDisplay'
import useViewportUpdate from '../hooks/useViewportUpdate'
import useViewportInteraction from '../hooks/useInteraction/useViewportInteraction'
import { ViewerProp } from './types'

export function InsightViewer({
  image,
  Progress,
  viewport,
  interaction,
  onViewportChange,
  children,
}: WithChildren<ViewerProp>): JSX.Element {
  const elRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<Viewport>(viewport ?? BASE_VIEWPORT) // viewport props

  // Enable/disable cornerstone.js.
  useCornerstone(elRef.current)
  useImageDisplay({
    element: elRef.current,
    image,
    viewportRef,
    onViewportChange,
  })
  // Update cornerstone viewport when viewport prop changes.
  useViewportUpdate({
    element: elRef.current,
    image,
    viewport,
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
    if (viewport) viewportRef.current = viewport
  }, [viewport])

  return (
    <ViewerWrapper ref={elRef} Progress={Progress}>
      {children}
    </ViewerWrapper>
  )
}
