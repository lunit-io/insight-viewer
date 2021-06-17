import { useEffect } from 'react'
import { loadImage, CornerstoneImage } from '../../utils/cornerstoneHelper'
import setWadoImageLoader from '../../utils/cornerstoneHelper/setWadoImageLoader'
import { loadingProgressMessage } from '../../utils/messageService'
import getHttpClient from '../../utils/httpClient'
import { HTTP } from '../../types'

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
    })
  })
  return Promise.all(promiseArray)
}

async function prefetch({
  images,
  requestInterceptor,
  onError,
}: HTTP & {
  images: string[]
}) {
  try {
    const loaders = images.map(image =>
      loadImage(image, {
        loader: getHttpClient(false, requestInterceptor),
      })
    )
    return PromiseAllWithProgress(loaders)
  } catch (err) {
    onError(err)
    return undefined
  }
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

    setWadoImageLoader(onError).then(async () => {
      await prefetch({ images, requestInterceptor, onError })
      loaded = true
    })

    return undefined
  }, [images, onError, requestInterceptor, prefetchEnabled])
}
