import { loadImage } from '../../utils/cornerstoneHelper'
import { RequestInterceptor, ImageLoaderScheme } from '../../types'
import { IMAGE_LOADER_SCHEME } from '../../const'
import { getHttpClient } from '../../utils/httpClient'
import { ImageWithoutKey } from '../../Viewer/types'

interface LoadCornerstoneImagesVer1 {
  imageScheme: ImageLoaderScheme
  requestInterceptor: RequestInterceptor
  timeout: number
  loader?: never
}

interface LoadCornerstoneImagesVer2 {
  imageScheme?: never
  requestInterceptor?: never
  timeout?: never
  loader: (url: string) => Promise<ArrayBuffer>
}

interface LoadCornerstoneImages {
  (arg: { imageId: string } & (LoadCornerstoneImagesVer1 | LoadCornerstoneImagesVer2)): Promise<ImageWithoutKey>
}

/**
 * It calls cornerstone.js loadImage. It is pluggable for unit test.
 */
export const loadCornerstoneImages: LoadCornerstoneImages = ({
  imageId,
  loader,
  imageScheme,
  requestInterceptor,
  timeout,
}) => {
  const doesNeedLoader = imageScheme !== IMAGE_LOADER_SCHEME.DICOMFILE

  if (!doesNeedLoader) {
    return loadImage(imageId, { loader: undefined })
  }

  if (loader === undefined) {
    const httpClient = getHttpClient({ requestInterceptor, timeout })
    return loadImage(imageId, { loader: httpClient })
  }

  return loadImage(imageId, { loader })
}
