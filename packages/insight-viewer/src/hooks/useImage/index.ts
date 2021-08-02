import { useEffect, useReducer } from 'react'
import { LOADER_TYPE, LOADING_STATE, CONFIG } from '../../const'
import { LoadingState, LoaderType } from '../../types'
import {
  loadImage as cornerstoneLoadImage,
  CornerstoneImage,
} from '../../utils/cornerstoneHelper'
import getHttpClient from '../../utils/httpClient'
import { formatError } from '../../utils/common'
import { useImageLoader } from '../useImageLoader'
import {
  imageLoadReducer,
  INITIAL_IMAGE_LOAD_STATE,
} from '../../stores/imageLoadReducer'
import { ImageLoad, DefaultGetImage, GetImage } from './types'

const _getImage: DefaultGetImage = async ({ imageId, requestInterceptor }) => {
  try {
    return await cornerstoneLoadImage(imageId, {
      loader: getHttpClient(requestInterceptor),
    })
  } catch (e) {
    throw formatError(e)
  }
}

/**
 * If successful, return cornerstone image.
 * If not successful, throw error.
 * getImage is pluggable for unit test.
 */
export async function loadImage({
  imageId,
  requestInterceptor,
  onError,
  getImage = _getImage,
}: Required<ImageLoad> & {
  getImage?: GetImage
  imageId: string
}): Promise<CornerstoneImage> {
  try {
    return await getImage({
      imageId,
      requestInterceptor,
    })
  } catch (e) {
    onError(e)
    throw e
  }
}

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
