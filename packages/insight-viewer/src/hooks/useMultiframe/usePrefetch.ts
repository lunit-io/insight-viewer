import { useEffect } from 'react'
import { from, Observable } from 'rxjs'
import { concatMap, map, catchError } from 'rxjs/operators'
import { loadImage, CornerstoneImage } from '../../utils/cornerstoneHelper'
import setWadoImageLoader from '../../utils/cornerstoneHelper/setWadoImageLoader'
import { loadingProgressMessage } from '../../utils/messageService'
import getHttpClient from '../../utils/httpClient'
import { formatError } from '../../utils/common'
import { HTTP, RequestInterceptor } from '../../types'

type GetLoadImage = (
  image: string,
  requestInterceptor: RequestInterceptor
) => Promise<CornerstoneImage>

export interface Prefetched {
  image: CornerstoneImage
  loadedPercentage: number
}

const _getLoadImage: GetLoadImage = (image, requestInterceptor) =>
  loadImage(image, {
    loader: getHttpClient(requestInterceptor, true),
  })

/**
 * getLoadImage is pluggable for unit test.
 */
export function prefetch({
  images,
  requestInterceptor,
  getLoadImage = _getLoadImage,
}: {
  images: string[]
  requestInterceptor: RequestInterceptor
  getLoadImage?: GetLoadImage
}): Observable<Prefetched> {
  // Start multiframe image loading.
  loadingProgressMessage.sendMessage(0)
  let loadedCount = 0

  return from(images).pipe(
    // Sequential Requests.
    concatMap(image => getLoadImage(image, requestInterceptor)),
    map(image => {
      loadedCount += 1
      const loaded = Math.round((loadedCount * 100) / images.length)
      loadingProgressMessage.sendMessage(loaded)
      return {
        image,
        loadedPercentage: loaded,
      }
    }),
    catchError(err => {
      throw formatError(err)
    })
  )
}

export default function usePrefetch({
  images,
  onError,
  requestInterceptor,
  prefetch: prefetchEnabled,
}: HTTP & {
  images: string[]
  prefetch: boolean
}): void {
  useEffect(() => {
    if (!prefetchEnabled) return
    if (images.length === 0) return

    setWadoImageLoader(onError).then(() => {
      prefetch({ images, requestInterceptor }).subscribe({
        next: _ => {},
        error: err => onError(err),
      })
    })
  }, [images, onError, requestInterceptor, prefetchEnabled])
}
