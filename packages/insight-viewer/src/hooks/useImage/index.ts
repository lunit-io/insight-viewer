import { useEffect, useReducer } from 'react'
import { LOADER_TYPE, LOADING_STATE, CONFIG } from '../../const'
import { LoadingState, LoaderType } from '../../types'
import { CornerstoneImage } from '../../utils/cornerstoneHelper'
import { useImageLoader } from '../useImageLoader'
import {
  imageLoadReducer,
  INITIAL_IMAGE_LOAD_STATE,
} from '../../stores/imageLoadReducer'
import { ImageLoad } from './types'
import { loadImage } from './loadImage'

export function useImage({
  requestInterceptor = CONFIG.requestInterceptor,
  onError = CONFIG.onError,
  imageId,
  type = LOADER_TYPE.Dicom,
}: ImageLoad & {
  type?: LoaderType
}): {
  loadingState: LoadingState
  image: CornerstoneImage | undefined
} {
  const [state, dispatch] = useReducer(
    imageLoadReducer,
    INITIAL_IMAGE_LOAD_STATE
  )
  const { loadingState, image } = state
  const hasLoader = useImageLoader(type, onError)

  useEffect(() => {
    if (!hasLoader) return
    dispatch({ type: LOADING_STATE.LOADING })

    loadImage({
      imageId,
      requestInterceptor,
      onError,
    })
      .then(res => {
        dispatch({
          type: LOADING_STATE.SUCCESS,
          payload: res,
        })
      })
      .catch(() => dispatch({ type: LOADING_STATE.FAIL }))
  }, [hasLoader, imageId, requestInterceptor, onError])

  return {
    loadingState,
    image,
  }
}
