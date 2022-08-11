import { loadImage } from '../../utils/cornerstoneHelper'
import { RequestInterceptor, ImageLoaderScheme } from '../../types'
import { IMAGE_LOADER_SCHEME } from '../../const'
import { getHttpClient } from '../../utils/httpClient'
import { ImageWithoutKey } from '../../Viewer/types'

interface GetImage {
  (arg: {
    imageId: string
    imageScheme: ImageLoaderScheme
    requestInterceptor: RequestInterceptor
    timeout: number
  }): Promise<ImageWithoutKey>
}

/**
 * It calls cornerstone.js loadImage. It is pluggable for unit test.
 */
export const loadCornerstoneImages: GetImage = ({ imageId, imageScheme, requestInterceptor, timeout }) =>
  loadImage(imageId, {
    loader:
      imageScheme === IMAGE_LOADER_SCHEME.DICOMFILE
        ? undefined
        : getHttpClient({
            requestInterceptor,
            timeout,
          }),
  })
