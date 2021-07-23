import { useEffect } from 'react'
import { loadImage, CornerstoneImage } from '../../utils/cornerstoneHelper'
import setWadoImageLoader from '../../utils/cornerstoneHelper/setWadoImageLoader'
import { loadingProgressMessage } from '../../utils/messageService'
import getHttpClient from '../../utils/httpClient'
import { formatError } from '../../utils/common'
import { HTTP, RequestInterceptor } from '../../types'

export type GetLoadImage = (
  image: string,
  requestInterceptor: RequestInterceptor
) => Promise<CornerstoneImage>

function PromiseAllWithProgress(
  promiseArray: Promise<CornerstoneImage>[]
): Promise<CornerstoneImage[]> {
  let d = 0
  loadingProgressMessage.sendMessage(0)

  promiseArray.forEach(p => {
    p.then(() => {
      d += 1
      loadingProgressMessage.sendMessage(
        Math.round((d * 100) / promiseArray.length)
      )
    }).catch(e => e)
  })

  return Promise.all(promiseArray)
}

const _getLoadImage: GetLoadImage = (image, requestInterceptor) =>
  loadImage(image, {
    loader: getHttpClient(requestInterceptor, true),
  })

/**
 * If successful, return true. It works well.
 * If not successful, return false. It calls onError.
 * getLoadImage is pluggable for unit test.
 */
export async function prefetch({
  images,
  requestInterceptor,
  getLoadImage = _getLoadImage,
}: {
  images: string[]
  getLoadImage?: GetLoadImage
  requestInterceptor: RequestInterceptor
}): Promise<CornerstoneImage[]> {
  const loaders = images.map(image => getLoadImage(image, requestInterceptor))
  return PromiseAllWithProgress(loaders).catch(e => {
    throw formatError(e)
  })
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
    if (!prefetchEnabled) return undefined
    let loaded = false
    if (images.length === 0 || loaded) return undefined

    setWadoImageLoader(onError)
      .then(async () => {
        await prefetch({ images, requestInterceptor })
        loaded = true
      })
      .catch(e => {
        onError(e)
      })

    return undefined
  }, [images, onError, requestInterceptor, prefetchEnabled])
}
