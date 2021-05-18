import { useContext, useEffect, useState } from 'react'
import { loadImage, Image, wadoImageLoader$ } from '../utils/cornerstoneHelper'
import getHttpClient from '../utils/httpClient'
import { handleError } from '../utils/common'
import { loadingProgressMessage } from '../utils/messageService'
import ViewContext from '../Viewer/Context'
import { SetHeader, OnError } from '../types'

interface Load {
  images: string[]
  setHeader: SetHeader
  onError: OnError
}

interface ReturnUseMultiframe {
  frame: number
  setFrame: (n: number) => void
}

export interface ReturnCurriedUseMultiframe {
  (initial?: number): ReturnUseMultiframe
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
    }).catch(e => {
      handleError(e)
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

export function useMultiframe({
  images = [],
  initial = 0,
}: {
  images: string[]
  initial?: number
}): ReturnUseMultiframe {
  const { onError, setHeader } = useContext(ViewContext)
  const [frame, setFrame] = useState(initial)

  useEffect(() => {
    if (images.length === 0) return undefined
    wadoImageLoader$.subscribe(() => {
      prefetch({ images, setHeader, onError })
    })

    return undefined
  }, [images, onError, setHeader])

  return {
    frame,
    setFrame,
  }
}

export function curriedUseMultiframe(
  images: string[]
): ReturnCurriedUseMultiframe {
  return (initial = 0) => useMultiframe({ images, initial })
}
