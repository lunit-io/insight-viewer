/**
 * @fileoverview Loads an image(Dicom/Web) and return the image and loading state.
 */
import { useEffect, useReducer } from 'react'
import { LOADER_TYPE, LOADING_STATE, CONFIG } from '../../const'
import { LoadingState, LoaderType } from '../../types'
import { CornerstoneImage } from '../../utils/cornerstoneHelper'
import { useImageLoader } from '../useImageLoader'
import { imageLoadReducer, INITIAL_IMAGE_LOAD_STATE } from './imageLoadReducer'
import { Prop } from './types'
import { loadImage } from './loadImage'

interface UseImage {
  ({
    imageId,
    type,
    requestInterceptor,
    onError,
  }: Prop & {
    type?: LoaderType
  }): {
    loadingState: LoadingState
    image: CornerstoneImage | undefined
  }
}

/**
 * @param imageId The image url to load.
 * @param type The image type to load. 'Dicom'(default) | 'Web'.
 * @param requestInterceptor The callback is called before a request is sent.
 *  It use ky.js beforeRequest hook.
 * @param onError The error handler.
 * @returns <{ image, loadingState }> image is a CornerstoneImage.
 *  loadingState is 'initial'|'loading'|'success'|'fail'
 */
export const useImage: UseImage = ({
  imageId,
  type = LOADER_TYPE.Dicom,
  requestInterceptor = CONFIG.requestInterceptor,
  onError = CONFIG.onError,
}) => {
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
    image,
    loadingState,
  }
}
