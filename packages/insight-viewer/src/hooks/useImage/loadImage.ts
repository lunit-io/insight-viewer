/**
 * @fileoverview Loads images with cornerstone.js.
 */
import {
  loadImage as cornerstoneLoadImage,
  CornerstoneImage,
} from '../../utils/cornerstoneHelper'
import { getHttpClient } from '../../utils/httpClient'
import { formatError } from '../../utils/common'
import { Props, DefaultGetImage, GetImage } from './types'

interface LoadImage {
  ({
    imageId,
    requestInterceptor,
    onError,
    getImage,
  }: Required<Props> & {
    getImage?: GetImage
  }): Promise<CornerstoneImage>
}

/**
 * It calls cornerstone.js loadImage. It is pluggable for unit test.
 */
const _getImage: DefaultGetImage = async ({ imageId, requestInterceptor }) => {
  try {
    return await cornerstoneLoadImage(imageId, {
      loader: getHttpClient(requestInterceptor),
    })
  } catch (e) {
    throw formatError(e)
  }
}

/**
 * @param imageId The image url to load.
 * @param requestInterceptor The callback is called before a request is sent. It use ky.js beforeRequest hook.
 * @param getImage
 * @returns Promise<CornerstoneImage>.
 * @throws If image fetching fails.
 */
export const loadImage: LoadImage = async ({
  imageId,
  requestInterceptor,
  onError,
  getImage = _getImage,
}) => {
  try {
    return await getImage({
      imageId,
      requestInterceptor,
    })
  } catch (e) {
    onError(formatError(e))
    throw e
  }
}
