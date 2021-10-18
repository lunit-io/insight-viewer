import { loadImage } from '../../utils/cornerstoneHelper'
import { normalizeError } from '../../utils/common'
import { getHttpClient } from '../../utils/httpClient'
import { IMAGE_LOADER_SCHEME } from '../../const'
import { GetImage } from './types'

/**
 * It calls cornerstone.js loadImage. It is pluggable for unit test.
 */
export const loadCornerstoneImage: GetImage = async ({
  imageId,
  imageScheme,
  requestInterceptor,
}) => {
  try {
    return await loadImage(imageId, {
      loader:
        imageScheme === IMAGE_LOADER_SCHEME.DICOMFILE
          ? undefined
          : getHttpClient(requestInterceptor),
    })
  } catch (e) {
    throw normalizeError(e)
  }
}
