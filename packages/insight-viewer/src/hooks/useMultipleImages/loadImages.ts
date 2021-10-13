/**
 * @fileoverview Loads images sequentially.
 */
import { from, Observable } from 'rxjs'
import { concatMap, map, catchError } from 'rxjs/operators'
import { loadedCountMessageMessage } from '../../utils/messageService'
import { normalizeError } from '../../utils/common'
import { RequestInterceptor } from '../../types'
import { Loaded } from './types'
import { loadCornerstoneImages } from './loadCornerstoneImages'

interface LoadImages {
  ({
    images,
    requestInterceptor,
  }: {
    images: string[]
    requestInterceptor: RequestInterceptor
  }): Observable<Loaded>
}

/**
 * @param images The images urls to load.
 * @param requestInterceptor The callback is called before a request is sent. It use ky.js beforeRequest hook.
 * @returns Observable<{ image, loaded }>. image is cornerstone image. loaded is the numbe of loaded images.
 * @throws If image fetching fails.
 */
export const loadImages: LoadImages = ({ images, requestInterceptor }) => {
  let loaded = 0
  // Should send message before loading starts, because subscriber needs total value.
  loadedCountMessageMessage.sendMessage({
    loaded,
    total: images.length,
  })

  return from(images).pipe(
    // Sequential Requests.
    concatMap(image => loadCornerstoneImages(image, requestInterceptor)),
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
