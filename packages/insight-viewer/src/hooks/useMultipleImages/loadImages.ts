/**
 * @fileoverview Loads images sequentially.
 */
import { from, Observable } from 'rxjs'
import { concatMap, map, catchError } from 'rxjs/operators'
import { loadImage, CornerstoneImage } from '../../utils/cornerstoneHelper'
import { loadedCountMessageMessage } from '../../utils/messageService'
import { normalizeError } from '../../utils/common'
import { getHttpClient } from '../../utils/httpClient'
import { RequestInterceptor } from '../../types'
import { Loaded } from './types'

interface GetLoadImage {
  (
    image: string,
    requestInterceptor: RequestInterceptor
  ): Promise<CornerstoneImage>
}

interface LoadImages {
  ({
    images,
    requestInterceptor,
    getLoadImage,
  }: {
    images: string[]
    requestInterceptor: RequestInterceptor
    getLoadImage?: GetLoadImage
  }): Observable<Loaded>
}

/**
 * It calls cornerstone.js loadImage. It is pluggable for unit test.
 */
const _getLoadImage: GetLoadImage = (image, requestInterceptor) =>
  loadImage(image, {
    loader: getHttpClient(requestInterceptor),
  })

/**
 * @param images The images urls to load.
 * @param requestInterceptor The callback is called before a request is sent. It use ky.js beforeRequest hook.
 * @param getLoadImage
 * @returns Observable<{ image, loaded }>. image is cornerstone image. loaded is the numbe of loaded images.
 * @throws If image fetching fails.
 */
export const loadImages: LoadImages = ({
  images,
  requestInterceptor,
  getLoadImage = _getLoadImage,
}) => {
  let loaded = 0
  // Should send message before loading starts, because subscriber needs total value.
  loadedCountMessageMessage.sendMessage({
    loaded,
    total: images.length,
  })

  return from(images).pipe(
    // Sequential Requests.
    concatMap(image => getLoadImage(image, requestInterceptor)),
    map(image => {
      loaded += 1
      loadedCountMessageMessage.sendMessage({
        loaded,
        total: images.length,
      })
      return {
        image,
        loaded,
      }
    }),
    catchError(err => {
      throw normalizeError(err)
    })
  )
}
