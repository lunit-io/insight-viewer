import { loadImage } from '../../utils/cornerstoneHelper'
import { normalizeError } from '../../utils/common'
import { getHttpClient } from '../../utils/httpClient'
import { GetImage } from './types'

/**
 * It calls cornerstone.js loadImage. It is pluggable for unit test.
 */
export const loadCornerstoneImage: GetImage = async ({
  imageId,
  requestInterceptor,
}) => {
  try {
    return await loadImage(imageId, {
      loader: getHttpClient(requestInterceptor),
    })
  } catch (e) {
    throw normalizeError(e)
  }
}
