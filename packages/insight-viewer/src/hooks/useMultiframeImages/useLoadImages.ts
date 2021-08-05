import { useEffect, useReducer, useState } from 'react'
import { CornerstoneImage } from '../../utils/cornerstoneHelper'
import {
  imageLoadReducer,
  INITIAL_IMAGE_LOAD_STATE,
  ImagesLoadState,
} from '../../stores/imageLoadReducer'
import { LOADING_STATE } from '../../const'
import { useImageLoader } from '../useImageLoader'
import { loadImages } from './loadImages'
import { HTTP, LoaderType } from '../../types'
import { Loaded } from './types'

interface UseLoadImages {
  ({
    images,
    onError,
    requestInterceptor,
    type,
  }: HTTP & {
    images: string[]
    type?: LoaderType
  }): ImagesLoadState
}

/**
 * @param imageIds The images urls to load.
 * @param type The image type to load. 'Dicom'(default) | 'Web'.
 * @param requestInterceptor The callback is called before a request is sent.
 *  It use ky.js beforeRequest hook.
 * @param initialFrame
 * @param onError The error handler.
 * @returns <{ image, loadingState, frame, setFrame }> image is a CornerstoneImage.
 *  loadingState is 'initial'|'loading'|'success'|'fail'
 */
export const useLoadImages: UseLoadImages = ({
  images,
  onError,
  requestInterceptor,
  type,
}) => {
  const [loadedImages, setImages] = useState<CornerstoneImage[]>([])
  const [{ loadingState }, dispatch] = useReducer(
    imageLoadReducer,
    INITIAL_IMAGE_LOAD_STATE
  )
  const hasLoader = useImageLoader(type, onError)

  useEffect(() => {
    if (images.length === 0 || !hasLoader) return

    dispatch({ type: LOADING_STATE.LOADING })

    loadImages({ images, requestInterceptor }).subscribe({
      next: (res: Loaded) => {
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
