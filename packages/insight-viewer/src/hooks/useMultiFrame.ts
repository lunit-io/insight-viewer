import {
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'
import { loadImage, setWadoImageLoader } from '../utils/cornerstoneHelper'
import getHttpClient from '../utils/httpClient'
import ViewContext from '../Viewer/Context'
import { SetHeader, OnError } from '../types'

interface Load {
  imageIds: string[]
  setHeader: SetHeader
  onError: OnError
}

async function load({ imageIds, setHeader, onError }: Load) {
  try {
    const loaders = imageIds.map(imageId =>
      loadImage(imageId, {
        loader: getHttpClient(setHeader),
      })
    )
    return await Promise.all(loaders)
  } catch (err) {
    onError(err)
    return undefined
  }
}

export default function useMultiFrame(images: string[]): void {
  const { onError, setHeader } = useContext(ViewContext)

  useEffect(() => {
    if (images.length === 0) return undefined
    setWadoImageLoader(onError)
      .then(async () => {
        const res = await load({ imageIds: images, setHeader, onError })
        console.log('res', res)
      })
      .catch(err => {
        onError(err)
      })

    return undefined
  }, [images, onError, setHeader])
}
