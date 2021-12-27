/**
 * @fileoverview Display the single frame cornerstone image in a given HTML element and set viewport.
 */
import { useEffect, useRef } from 'react'
import { displayImage } from '../../utils/cornerstoneHelper'
import { formatViewport } from '../../utils/common/formatViewport'
import { BasicViewport } from '../../types'
import { UseImageDisplay } from './types'

/**
 * @param element The HTML Element enabled for Cornerstone.
 * @param image The Image loaded by a Cornerstone Image Loader.
 * @param viewportRef The reference to Viewer's viewport prop.
 * @param onViewportChange The viewport setter prop of Viewer.
 */
const useSingleFrameImageDisplay: UseImageDisplay = ({
  element,
  image,
  viewportRef,
  onViewportChange,
}) => {
  // If imageCountRef.current is bigger than 1, the image prop has been changed.
  const imageCountRef = useRef(0)
  const resetViewportRef = useRef<Partial<BasicViewport>>() // Use as initial viewport on reset.

  useEffect(() => {
    if (!image) return
    imageCountRef.current += 1
  }, [image])

  useEffect(() => {
    if (!image || !element) return
    // Only multiframe image has _persistentViewport property.
    if (image?._persistentViewport !== undefined) return

    const { viewport } = displayImage(
      element,
      image,
      viewportRef.current._initialViewport
        ? viewportRef.current._initialViewport // Use the user-defined default value.
        : resetViewportRef?.current // Reset viewport
    )

    if (viewportRef.current._initialViewport) {
      resetViewportRef.current = viewportRef.current._initialViewport // Image's user-defined initial viewport
    }

    // Updates viewport prop of Viewer after setting the image object.
    if (onViewportChange) {
      onViewportChange(formatViewport(viewport))
    }
  }, [image, element, viewportRef, onViewportChange])
}

export default useSingleFrameImageDisplay
