/**
 * @fileoverview Display a cornerstone image in a given HTML element and set viewport.
 */
import React, { useEffect, useRef } from 'react'
import { displayImage, CornerstoneImage } from '../utils/cornerstoneHelper'
import { initialViewportMessage } from '../utils/messageService'
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

    initialViewportMessage.sendMessage(defaultViewport)

    if (onViewportChange) {
      onViewportChange(formatViewport(viewport))
    }
  }, [element, image, viewportRef, onViewportChange])
}
