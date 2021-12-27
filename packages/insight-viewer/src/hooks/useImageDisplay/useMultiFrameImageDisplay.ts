/**
 * @fileoverview Display the multi frame cornerstone image in a given HTML element and set viewport.
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
const useMultiFrameImageDisplay: UseImageDisplay = ({
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

    // When viewport should be reset.
    if (image?._persistentViewport === false) {
      if (!viewportRef?.current) return
      if (imageCountRef.current > 1) {
        // eslint-disable-next-line no-param-reassign
        viewportRef.current._initialViewport = resetViewportRef?.current
      }
      imageCountRef.current = 0 // Reset count.
    }

    imageCountRef.current += 1
  }, [image, viewportRef])

  useEffect(() => {
    if (!image || !element) return
    // Only multiframe image has _persistentViewport property.
    if (image?._persistentViewport === undefined) return

    // At first, willPersistViewport is false and imageCountRef.current is 1.
    // On next rendering frame, willPersistViewport is true and imageCountRef.current is more than 2 because of setTimeout().
    const willPersistViewport = image?._persistentViewport === true

    // At this time, multiframe images are already displayed. No need to continue...
    if (willPersistViewport && imageCountRef.current === 2) return

    const viewportOnImageChanged = willPersistViewport
      ? viewportRef?.current // Use the current viewport prop of Viewer
      : resetViewportRef?.current // reset viewport

    const { viewport } = displayImage(
      element,
      image,
      viewportRef?.current?._initialViewport // This is the first time to display the image.
        ? viewportRef?.current?._initialViewport // Use the user-defined default value.
        : viewportOnImageChanged
    )

    // When the first multiframe image is displayed.
    if (
      image?._persistentViewport === false &&
      viewportRef?.current?._initialViewport
    ) {
      resetViewportRef.current = viewportRef?.current?._initialViewport
    }

    // Updates viewport prop of Viewer after setting the image object.
    if (onViewportChange) {
      onViewportChange(formatViewport(viewport))
    }
  }, [element, image, viewportRef, onViewportChange])
}

export default useMultiFrameImageDisplay
