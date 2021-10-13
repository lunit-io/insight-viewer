import { loadImage, CornerstoneImage } from '../../utils/cornerstoneHelper'
import { RequestInterceptor } from '../../types'
import { getHttpClient } from '../../utils/httpClient'

interface GetLoadImage {
  (
    image: string,
    requestInterceptor: RequestInterceptor
  ): Promise<CornerstoneImage>
}

/**
 * It calls cornerstone.js loadImage. It is pluggable for unit test.
 */
export const loadCornerstoneImages: GetLoadImage = (
  image,
  requestInterceptor
) =>
  loadImage(image, {
    loader: getHttpClient(requestInterceptor),
  })
