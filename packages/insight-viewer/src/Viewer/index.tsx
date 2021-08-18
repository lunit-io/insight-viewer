import React, { useRef, useEffect } from 'react'
import ViewerWrapper from '../components/ViewerWrapper'
import { WithChildren } from '../types'
import useCornerstone from '../hooks/useCornerstone'
import useImageDisplay from '../hooks/useImageDisplay'
import useViewportUpdate from '../hooks/useViewportUpdate'
import useViewportInteraction from '../hooks/useInteraction/useViewportInteraction'
import useInitialViewport from '../hooks/useInitialViewport'
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
  const viewportRef = useRef(viewport)
  const initialViewporRef = useInitialViewport()
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
