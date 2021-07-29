import React, { useEffect, useRef } from 'react'
import { displayImage, CornerstoneImage } from '../utils/cornerstoneHelper'
import {
  loadingProgressMessage,
  initialViewportMessage,
} from '../utils/messageService'
import { formatViewport } from '../utils/common/formatViewport'
import { Element, Viewport, OnViewportChange } from '../types'

interface Prop {
  element: Element
  image: CornerstoneImage | undefined
  viewportRef?: React.MutableRefObject<Viewport | undefined>
  onViewportChange?: OnViewportChange
}

export default function useImageDisplay({
  element,
  image,
  viewportRef,
  onViewportChange,
}: Prop): void {
  // Determine whether it is first load or subsequent load(multiframe viewer)
  const loadCountRef = useRef(0)

  useEffect(() => {
    if (!image || !element) return

    loadCountRef.current += 1

    const { viewport, defaultViewport } = displayImage(
      element,
      image,
      loadCountRef.current === 1
        ? viewportRef?.current?._default
        : viewportRef?.current
    )
    // This is for no content-length gzip image. Normally, meaningless.
    loadingProgressMessage.sendMessage(100)
    initialViewportMessage.sendMessage(defaultViewport)

    if (onViewportChange) {
      onViewportChange(formatViewport(viewport))
    }
  }, [element, image, viewportRef, onViewportChange])
}