/**
 * @fileoverview Loads an image(Dicom/Web) and return the loaded image and loading state of it.
 */
import { useEffect, useReducer } from 'react'
import { LOADING_STATE, CONFIG } from '../../const'
import { LoadingState, ImageId, HTTP } from '../../types'
import { CornerstoneImage } from '../../utils/cornerstoneHelper'
import { useImageLoader } from '../useImageLoader'
import { imageLoadReducer, INITIAL_IMAGE_LOAD_STATE } from './imageLoadReducer'
import { loadImage } from './loadImage'
import { getImageIdAndScheme } from './getImageIdAndScheme'

interface UseImage {
  (props: Partial<HTTP> & ImageId): {
    loadingState: LoadingState
    image: CornerstoneImage | undefined
  }
}

/**
 * @param rest wadouri | dicomfile | web
 * @param requestInterceptor The callback is called before a request is sent.
 *  It use ky.js beforeRequest hook.
 * @param onError The error handler.
 * @returns <{ image, loadingState }> image is a CornerstoneImage.
 *  loadingState is 'initial'|'loading'|'success'|'fail'
 */
export const useImage: UseImage = ({
  requestInterceptor = CONFIG.requestInterceptor,
  onError = CONFIG.onError,
  ...rest
}) => {
  const { id: imageId, scheme: imageScheme } = getImageIdAndScheme(rest)

  const [state, dispatch] = useReducer(
    imageLoadReducer,
    INITIAL_IMAGE_LOAD_STATE
  )
  const { loadingState, image } = state
  const hasLoader = useImageLoader(rest, onError)

  useEffect(() => {
    if (!hasLoader || !imageId || !imageScheme) return
    dispatch({ type: LOADING_STATE.LOADING })

    loadImage({
      imageId,
      imageScheme,
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
  }, [hasLoader, imageId, imageScheme, requestInterceptor, onError])

  return {
    image,
    loadingState,
  }
}
