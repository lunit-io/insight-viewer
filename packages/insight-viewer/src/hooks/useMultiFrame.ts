import { useContext, useEffect } from 'react'
import {
  loadImage,
  setWadoImageLoader,
  Image,
} from '../utils/cornerstoneHelper'
import getHttpClient from '../utils/httpClient'
import { loadingProgressMessage } from '../utils/messageService'
import ViewContext from '../Viewer/Context'
import { SetHeader, OnError } from '../types'

interface Load {
  imageIds: string[]
  setHeader: SetHeader
  onError: OnError
}

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

async function prefetch({ imageIds, setHeader, onError }: Load) {
  try {
    const loaders = imageIds.map(imageId =>
      loadImage(imageId, {
        loader: getHttpClient(false, setHeader),
      })
    )
    return PromiseAllWithProgress(loaders)
  } catch (err) {
    onError(err)
    return undefined
  }
}

export default function useMultiFrame(imageIds: string[]): void {
  const { onError, setHeader } = useContext(ViewContext)

  useEffect(() => {
    if (imageIds.length === 0) return undefined

    setWadoImageLoader(onError)
      .then(async () => {
        await prefetch({ imageIds, setHeader, onError })
      })
      .catch(err => {
        onError(err)
      })

    return undefined
  }, [imageIds, onError, setHeader])
}
