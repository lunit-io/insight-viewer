/**
 * @fileoverview Loads images with cornerstone.js.
 */
import { normalizeError } from '../../utils/common'
import { ImageLoaderScheme } from '../../types'
import { Props } from './types'
import { loadCornerstoneImage } from './loadCornerstoneImage'
import { ImageWithoutKey } from '../../Viewer/types'

interface LoadImage {
  ({
    imageId,
    imageScheme,
    requestInterceptor,
    onError,
    timeout,
  }: Required<Props> & {
    imageScheme: ImageLoaderScheme
    timeout: number
  }): Promise<ImageWithoutKey>
}

/**
 * @param imageId The image url to load.
 * @param requestInterceptor The callback is called before a request is sent. It use ky.js beforeRequest hook.
 * @returns Promise<CornerstoneImage>.
 * @throws If image fetching fails.
 */
export const loadImage: LoadImage = async ({ imageId, imageScheme, requestInterceptor, onError, timeout }) => {
  try {
    const cornerStoneImage = await loadCornerstoneImage({
      imageId,
      imageScheme,
      requestInterceptor,
      timeout,
    })

    return cornerStoneImage
  } catch (e) {
    onError(normalizeError(e))
    throw e
  }
}
