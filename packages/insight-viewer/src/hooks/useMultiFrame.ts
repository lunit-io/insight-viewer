import { useContext, useEffect } from 'react'
import { Subscription } from 'rxjs'
import {
  loadImage,
  setWadoImageLoader,
  displayImage,
  Image,
} from '../utils/cornerstoneHelper'
import getHttpClient from '../utils/httpClient'
import {
  prefetchMessage,
  loadingProgressMessage,
} from '../utils/messageService'
import ViewContext from '../Viewer/Context'
import { SetHeader, OnError } from '../types'
import { elementId } from '../components/ViewerWrapper'

interface Load {
  imageIds: string[]
  setHeader: SetHeader
  onError: OnError
}

let imageObjects: Image[]
let subscription: Subscription

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

export type SetFrame = (frame: number) => void

const setFrame: SetFrame = frame => {
  if (subscription) {
    const image = imageObjects?.[frame]
    const element = document.getElementById(elementId)
    displayImage(<HTMLDivElement>element, image)
  } else {
    subscription = prefetchMessage
      .getMessage()
      .subscribe((message: Image[]) => {
        imageObjects = message
        const image = message?.[frame]
        const element = document.getElementById(elementId)
        displayImage(<HTMLDivElement>element, image)
      })
  }
}

export default function useMultiFrame(imageIds: string[]): {
  setFrame: SetFrame
} {
  const { onError, setHeader } = useContext(ViewContext)

  useEffect(() => {
    if (imageIds.length === 0) return undefined

    setWadoImageLoader(onError)
      .then(async () => {
        const images = await prefetch({ imageIds, setHeader, onError })
        prefetchMessage.sendMessage(images ?? [])
      })
      .catch(err => {
        onError(err)
      })

    return undefined
  }, [imageIds, onError, setHeader])

  useEffect(() => {
    if (subscription) return undefined
    subscription = prefetchMessage
      .getMessage()
      .subscribe((message: Image[]) => {
        imageObjects = message
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return {
    setFrame,
  }
}
