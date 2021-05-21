import { useEffect, useContext } from 'react'
import ViewContext from '../Context'
import {
  loadImage,
  setWadoImageLoader,
  Image,
} from '../utils/cornerstoneHelper'
import { loadingProgressMessage } from '../utils/messageService'
import getHttpClient from '../utils/httpClient'
import { SetHeader, OnError } from '../types'

interface Load {
  images: string[]
  setHeader: SetHeader
  onError: OnError
}

let loaded = false

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

async function prefetch({ images, setHeader, onError }: Load) {
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

export default function usePrefetch(images: string[]): void {
  const { onError, setHeader } = useContext(ViewContext)

  useEffect(() => {
    if (images.length === 0 || loaded) return undefined

    setWadoImageLoader(onError).then(async () => {
      await prefetch({ images, setHeader, onError })
      loaded = true
    })

    return undefined
  }, [images, onError, setHeader])
}
