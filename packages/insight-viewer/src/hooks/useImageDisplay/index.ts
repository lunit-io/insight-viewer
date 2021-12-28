/**
 * @fileoverview Display image in a given HTML element and set viewport.
 */
import { useEffect, useRef } from 'react'
import {
  displayImage,
  getDefaultViewportForImage,
} from '../../utils/cornerstoneHelper'
import {
  formatViewerViewport,
  formatCornerstoneViewport,
} from '../../utils/common/formatViewport'
import { BasicViewport } from '../../types'
import { UseImageDisplay } from './types'

let imageSeriesKey: number

/**
 * @param element The HTML Element enabled for Cornerstone.
 * @param image The Image loaded by a Cornerstone Image Loader.
 * @param viewportRef The reference to Viewer's viewport prop.
 * @param onViewportChange The viewport setter prop of Viewer.
 */
const useImageDisplay: UseImageDisplay = ({
  element,
  image,
  viewportRef,
  onViewportChange,
}) => {
  // Reset the viewport with this.
  const resetViewportRef = useRef<Partial<BasicViewport>>()

  useEffect(() => {
    if (!image || image._imageSeriesKey === undefined) return
    if (imageSeriesKey) return
    // Set the first imageSeriesKey value.
    imageSeriesKey = image._imageSeriesKey
  }, [image])

  useEffect(() => {
    if (!image || !element) return

    function getMultiframeViewport() {
      // When the image series has been changed.
      if (imageSeriesKey !== image?._imageSeriesKey) {
        return resetViewportRef?.current // Reset the viewport
      }
      // Persist the current viewport
      const defaultViewport = getDefaultViewportForImage(
        <HTMLDivElement>element,
        image
      )
      return {
        ...formatCornerstoneViewport(defaultViewport),
        ...viewportRef.current,
      }
    }

    const displayViewport =
      image._imageSeriesKey === undefined // In case of single frame image.
        ? resetViewportRef?.current // Reset viewport
        : getMultiframeViewport()

    const { viewport } = displayImage(
      element,
      image,
      viewportRef.current._initialViewport
        ? viewportRef.current._initialViewport // The first render.
        : displayViewport
    )

    // In case of multiframe image, update imageSeriesKey.
    if (
      image._imageSeriesKey !== undefined &&
      imageSeriesKey !== image._imageSeriesKey
    ) {
      imageSeriesKey = image._imageSeriesKey
    }

    // Save the user-defined initial viewport for reset.
    if (viewportRef.current._initialViewport) {
      resetViewportRef.current = viewportRef.current._initialViewport
    }

    // Updates the viewport prop of Viewer.
    if (onViewportChange) {
      onViewportChange(formatViewerViewport(viewport))
    }
  }, [image, element, viewportRef, onViewportChange])
}

export default useImageDisplay
