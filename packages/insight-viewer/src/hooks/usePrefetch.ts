import { useEffect } from 'react'
import {
  loadImage,
  setWadoImageLoader,
  Image,
} from '../utils/cornerstoneHelper'
import { loadingProgressMessage } from '../utils/messageService'
import getHttpClient from '../utils/httpClient'
import { ViewerProp } from '../types'
import { DefaultProp } from '../Viewer/const'

function PromiseAllWithProgress(
  promiseArray: Promise<Image>[]
): Promise<Image[]> {
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
  setHeader,
  onError,
}: Pick<Required<ViewerProp>, 'onError' | 'setHeader'> & {
  images: string[]
}) {
  try {
    const loaders = images.map(image =>
      loadImage(image, {
        loader: getHttpClient(false, setHeader),
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
  onError = DefaultProp.onError,
  setHeader = DefaultProp.setHeader,
}: Pick<ViewerProp, 'onError' | 'setHeader'> & {
  images: string[]
}): void {
  useEffect(() => {
    let loaded = false
    if (images.length === 0 || loaded) return undefined

    setWadoImageLoader(onError).then(async () => {
      await prefetch({ images, setHeader, onError })
      loaded = true
    })

    return undefined
  }, [images, onError, setHeader])
}
