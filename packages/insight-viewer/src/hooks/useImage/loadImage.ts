/**
 * @fileoverview Loads images with cornerstone.js.
 */
import { CornerstoneImage } from '../../utils/cornerstoneHelper'
import { normalizeError } from '../../utils/common'
import { Props } from './types'
import { loadCornerstoneImage } from './loadCornerstoneImage'

interface LoadImage {
  ({
    imageId,
    requestInterceptor,
    onError,
  }: Required<Props>): Promise<CornerstoneImage>
}

/**
 * @param imageId The image url to load.
 * @param requestInterceptor The callback is called before a request is sent. It use ky.js beforeRequest hook.
 * @returns Promise<CornerstoneImage>.
 * @throws If image fetching fails.
 */
export const loadImage: LoadImage = async ({
  imageId,
  requestInterceptor,
  onError,
}) => {
  try {
    return await loadCornerstoneImage({
      imageId,
      requestInterceptor,
    })
  } catch (e) {
    onError(normalizeError(e))
    throw e
  }
}
