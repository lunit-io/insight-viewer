import { useState, useEffect, useReducer } from 'react'
import { LOADER_TYPE, CONFIG } from '../../const'
import {
  loadImage as cornerstoneLoadImage,
  CornerstoneImage,
} from '../../utils/cornerstoneHelper'
import getHttpClient from '../../utils/httpClient'
import { formatError } from '../../utils/common'
import setWadoImageLoader from '../../utils/cornerstoneHelper/setWadoImageLoader'
import setWebImageLoader from '../../utils/cornerstoneHelper/setWebImageLoader'
import { imageLoadReducer, INITIAL_IMAGE_LOAD_STATE } from './reducers'
import { LOADING_STATE } from './const'
import {
  LoadingState,
  ImageLoad,
  LoaderType,
  DefaultGetImage,
  GetImage,
} from './types'

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

export function useImageLoad({
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
  const [hasLoader, setHasLoader] = useState(false)

  const loader =
    type === LOADER_TYPE.Dicom ? setWadoImageLoader : setWebImageLoader

  // eslint-disable-next-line no-extra-semi
  ;(async function asyncLoad(): Promise<void> {
    if (!hasLoader) setHasLoader(await loader(onError))
  })()

  useEffect(() => {
    if (!hasLoader) return
    dispatch({ type: LOADING_STATE.LOADING })

    loadImage({
      imageId,
      requestInterceptor,
      onError,
    })
      .then(img => {
        dispatch({ type: LOADING_STATE.SUCCESS, payload: img })
      })
      .catch(() => dispatch({ type: LOADING_STATE.FAIL }))
  }, [hasLoader, imageId, requestInterceptor, onError])

  return {
    loadingState,
    image,
  }
}
