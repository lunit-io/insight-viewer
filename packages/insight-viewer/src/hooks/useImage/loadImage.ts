/**
 * @fileoverview Loads images with cornerstone.js.
 */
import { normalizeError } from '../../utils/common'
import { ImageLoaderScheme } from '../../types'
import { Props } from './types'
import { loadCornerstoneImage } from './loadCornerstoneImage'
import { Image } from '../../Viewer/types'

interface LoadImage {
  ({
    imageId,
    imageScheme,
    requestInterceptor,
    onError,
  }: Required<Props> & {
    imageScheme: ImageLoaderScheme
  }): Promise<Image>
}

/**
 * @param imageId The image url to load.
 * @param requestInterceptor The callback is called before a request is sent. It use ky.js beforeRequest hook.
 * @returns Promise<CornerstoneImage>.
 * @throws If image fetching fails.
 */
export const loadImage: LoadImage = async ({ imageId, imageScheme, requestInterceptor, onError }) => {
  try {
    return await loadCornerstoneImage({
      imageId,
      imageScheme,
      requestInterceptor,
    })
  } catch (e) {
    onError(normalizeError(e))
    throw e
  }
}
