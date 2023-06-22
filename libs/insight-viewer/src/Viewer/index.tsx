import React, { useRef, useEffect } from 'react'
import ViewerWrapper from '../components/ViewerWrapper'
import useCornerstone from '../hooks/useCornerstone'
import useImageDisplay from '../hooks/useImageDisplay'
import useViewportUpdate from '../hooks/useViewportUpdate'
import useViewportInteraction from '../hooks/useInteraction/useViewportInteraction'
import { OverlayContextProvider } from '../contexts'

import type { ViewerProp } from './types'
import type { WithChildren, Viewport } from '../types'

export function InsightViewer({
  image,
  Progress,
  viewport,
  interaction,
  onViewportChange,
  children,
  viewerRef,
}: WithChildren<ViewerProp>): JSX.Element {
  const elRef = useRef<HTMLDivElement | null>(null)
  const viewportRef = useRef<Partial<Viewport>>(viewport ?? {}) // viewport props

  const refCallback = (element: HTMLDivElement) => {
    elRef.current = element

    if (!viewerRef) return

    viewerRef.current = element
  }

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
    image,
    element: elRef.current,
    interaction,
    viewport,
    onViewportChange,
  })

  useEffect(() => {
    if (viewport) viewportRef.current = viewport
  }, [viewport])

  return (
    <ViewerWrapper ref={refCallback} Progress={Progress} onViewportChange={onViewportChange} imageEnabled={!!image}>
      <OverlayContextProvider image={image} element={elRef.current} imageEnabled={!!image} viewport={viewport}>
        {children}
      </OverlayContextProvider>
    </ViewerWrapper>
  )
}
