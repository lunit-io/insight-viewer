/**
 * @fileoverview Display the cornerstone image in a given HTML element and set viewport.
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

/**
 * @param element The HTML Element enabled for Cornerstone.
 * @param image The Image loaded by a Cornerstone Image Loader.
 * @param viewportRef The reference to Viewer's viewport prop.
 * @param onViewportChange The viewport setter prop of Viewer.
 */
export default function useImageDisplay({
  element,
  image,
  viewportRef,
  onViewportChange,
}: Prop): void {
  // Determine whether it is the first load or subsequent load(in case of multiframe viewer)
  const loadCountRef = useRef(0)

  useEffect(() => {
    if (!image || !element) return

    loadCountRef.current += 1 // This is 1 unless the image is not changed.
    // viewport and defaultViewport from dispalyImage() are same when there is no user-defined default value.
    const { viewport, defaultViewport } = displayImage(
      element,
      image,
      loadCountRef.current === 1 // This is the first time to display the image.
        ? viewportRef?.current?._initialViewport // Use the user-defined default value.
        : viewportRef?.current // Use the current viewport prop of Viewer(for multiframe images).
    )
    // Sets the default viewport for later use on resetting.
    initialViewportMessage.sendMessage(defaultViewport)
    // Updates viewport prop of Viewer after setting the image object.
    if (onViewportChange) {
      onViewportChange(formatViewport(viewport))
    }
  }, [element, image, viewportRef, onViewportChange])
}
