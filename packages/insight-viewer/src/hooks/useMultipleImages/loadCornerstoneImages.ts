import { loadImage } from '../../utils/cornerstoneHelper'
import { RequestInterceptor, ImageLoaderScheme } from '../../types'
import { IMAGE_LOADER_SCHEME } from '../../const'
import { getHttpClient } from '../../utils/httpClient'
import { ImageWithoutKey } from '../../Viewer/types'

interface GetLoadImage {
  (image: string, imageScheme: ImageLoaderScheme, requestInterceptor: RequestInterceptor): Promise<ImageWithoutKey>
}

/**
 * It calls cornerstone.js loadImage. It is pluggable for unit test.
 */
export const loadCornerstoneImages: GetLoadImage = (image, imageScheme, requestInterceptor) =>
  loadImage(image, {
    loader: imageScheme === IMAGE_LOADER_SCHEME.DICOMFILE ? undefined : getHttpClient(requestInterceptor),
  })
