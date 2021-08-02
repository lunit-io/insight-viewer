import { useEffect, useReducer, useState } from 'react'
import { from, Observable } from 'rxjs'
import { concatMap, map, catchError } from 'rxjs/operators'
import { loadImage, CornerstoneImage } from '../../utils/cornerstoneHelper'
import { loadingProgressMessage } from '../../utils/messageService'
import getHttpClient from '../../utils/httpClient'
import { formatError } from '../../utils/common'
import { HTTP, RequestInterceptor, LoaderType } from '../../types'
import {
  imageLoadReducer,
  INITIAL_IMAGE_LOAD_STATE,
  ImageLoadState,
} from '../../stores/imageLoadReducer'
import { LOADING_STATE } from '../../const'
import { useImageLoader } from '../useImageLoader'

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
  type,
}: HTTP & {
  images: string[]
  type?: LoaderType
}): Omit<ImageLoadState, 'image'> & {
  images: CornerstoneImage[]
} {
  const [loadedImages, setImages] = useState<CornerstoneImage[]>([])
  const [{ loadingState }, dispatch] = useReducer(
    imageLoadReducer,
    INITIAL_IMAGE_LOAD_STATE
  )
  const hasLoader = useImageLoader(type, onError)

  useEffect(() => {
    if (images.length === 0 || !hasLoader) return

    dispatch({ type: LOADING_STATE.LOADING })

    prefetch({ images, requestInterceptor }).subscribe({
      next: (res: Prefetched) => {
        setImages(prev => [...prev, res.image])
        dispatch({
          type: LOADING_STATE.SUCCESS,
          payload: res.image,
        })
      },
      error: err => {
        onError(err)
        dispatch({ type: LOADING_STATE.FAIL })
      },
    })
  }, [images, onError, requestInterceptor, hasLoader])

  return {
    loadingState,
    images: loadedImages,
  }
}
