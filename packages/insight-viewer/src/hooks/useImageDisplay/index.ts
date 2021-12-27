/**
 * @fileoverview Display the cornerstone image in a given HTML element and set viewport.
 */
import useSingleFrameImageDisplay from './useSingleFrameImageDisplay'
import useMultiFrameImageDisplay from './useMultiFrameImageDisplay'
import { UseImageDisplay } from './types'

/**
 * @param element The HTML Element enabled for Cornerstone.
 * @param image The Image loaded by a Cornerstone Image Loader.
 * @param viewportRef The reference to Viewer's viewport prop.
 * @param onViewportChange The viewport setter prop of Viewer.
 */

const useImageDisplay: UseImageDisplay = props => {
  useSingleFrameImageDisplay(props)
  useMultiFrameImageDisplay(props)
}

export default useImageDisplay
