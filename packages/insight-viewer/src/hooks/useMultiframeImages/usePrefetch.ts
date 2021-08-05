import { useEffect, useReducer, useState } from 'react'
import { CornerstoneImage } from '../../utils/cornerstoneHelper'
import {
  imageLoadReducer,
  INITIAL_IMAGE_LOAD_STATE,
  ImageLoadState,
} from '../../stores/imageLoadReducer'
import { LOADING_STATE } from '../../const'
import { useImageLoader } from '../useImageLoader'
import { prefetch } from './prefetch'
import { HTTP, LoaderType } from '../../types'
import { Prefetched } from './types'

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
