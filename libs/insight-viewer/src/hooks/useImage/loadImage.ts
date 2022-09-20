import { Loader, OnError } from './../../types/index'
/**
 * @fileoverview Loads images with cornerstone.js.
 */
import { normalizeError } from '../../utils/common'
import { loadCornerstoneImage } from './loadCornerstoneImage'
import { ImageWithoutKey } from '../../Viewer/types'

interface LoadImage {
  ({
    imageId,
    onError,
    loader,
  }: {
    imageId: string
    onError: OnError
    loader: Loader | undefined
  }): Promise<ImageWithoutKey>
}

/**
 * @param imageId The image url to load.
 * @param requestInterceptor The callback is called before a request is sent. It use ky.js beforeRequest hook.
 * @returns Promise<CornerstoneImage>.
 * @throws If image fetching fails.
 */
export const loadImage: LoadImage = async ({ imageId, onError, loader }) => {
  try {
    const cornerStoneImage = await loadCornerstoneImage({
      imageId,
      loader,
    })

    return cornerStoneImage
  } catch (e) {
    onError(normalizeError(e))
    throw e
  }
}
