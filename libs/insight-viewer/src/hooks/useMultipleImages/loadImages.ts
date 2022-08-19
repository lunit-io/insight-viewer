/**
 * @fileoverview Loads images sequentially.
 */
import { from, concatMap, map, catchError, Observable } from 'rxjs'
import { loadedCountMessageMessage } from '../../utils/messageService'
import { normalizeError } from '../../utils/common'
import { RequestInterceptor, ImageLoaderScheme } from '../../types'
import { Loaded } from './types'
import { loadCornerstoneImages } from './loadCornerstoneImages'

interface LoadImages {
  ({
    images,
    imageScheme,
    requestInterceptor,
  }: {
    images: string[]
    imageScheme: ImageLoaderScheme
    requestInterceptor: RequestInterceptor
    timeout: number
  }): Observable<Loaded>
}

/**
 * @param images The images urls to load.
 * @param requestInterceptor The callback is called before a request is sent. It use ky.js beforeRequest hook.
 * @returns Observable<{ image, loaded }>. image is cornerstone image. loaded is the numbe of loaded images.
 * @throws If image fetching fails.
 */
export const loadImages: LoadImages = ({ images, imageScheme, requestInterceptor, timeout }) => {
  let loaded = 0
  // Should send message before loading starts, because subscriber needs total value.
  loadedCountMessageMessage.sendMessage({
    loaded,
    total: images.length,
  })

  return from(images).pipe(
    // Sequential Requests.
    concatMap((imageId) => loadCornerstoneImages({ imageId, imageScheme, requestInterceptor, timeout })),
    map((image) => {
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
    catchError((err) => {
      throw normalizeError(err)
    })
  )
}
