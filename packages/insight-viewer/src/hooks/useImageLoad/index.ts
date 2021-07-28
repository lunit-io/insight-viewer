import { useState, useEffect } from 'react'
import { LOADING_STATE } from './const'
import { LOADER_TYPE } from '../../const'
import { LoadingState } from './types'
import {
  loadImage as cornerstoneLoadImage,
  CornerstoneImage,
} from '../../utils/cornerstoneHelper'
import getHttpClient from '../../utils/httpClient'
import { formatError } from '../../utils/common'
import { ViewerProp, RequestInterceptor, LoaderType } from '../../types'
import { DefaultProp } from '../../Viewer/const'
import setWadoImageLoader from '../../utils/cornerstoneHelper/setWadoImageLoader'
import setWebImageLoader from '../../utils/cornerstoneHelper/setWebImageLoader'

type DefaultGetImage = (arg: {
  imageId: string
  requestInterceptor: RequestInterceptor
}) => Promise<CornerstoneImage>
export type GetImage = DefaultGetImage | (() => Promise<CornerstoneImage>)

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
}: Required<ViewerProp> & {
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

export default function useImageLoad({
  requestInterceptor = DefaultProp.requestInterceptor,
  onError = DefaultProp.onError,
  imageId,
  type = LOADER_TYPE.Dicom,
}: ViewerProp & {
  type?: LoaderType
}): {
  loadingState: LoadingState
  image: CornerstoneImage | undefined
} {
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LOADING_STATE.INITIAL
  )
  const [hasLoader, setHasLoader] = useState(false)
  const [image, setImage] = useState<CornerstoneImage>()
  const loader =
    type === LOADER_TYPE.Dicom ? setWadoImageLoader : setWebImageLoader

  // eslint-disable-next-line no-extra-semi
  ;(async function asyncLoad(): Promise<void> {
    if (!hasLoader) setHasLoader(await loader(onError))
  })()

  useEffect(() => {
    if (!hasLoader) return
    setLoadingState(LOADING_STATE.LOADING)

    loadImage({
      imageId,
      requestInterceptor,
      onError,
    })
      .then(res => {
        setLoadingState(LOADING_STATE.SUCCESS)
        setImage(res)
      })
      .catch(() => setLoadingState(LOADING_STATE.FAIL))
  }, [hasLoader, imageId, requestInterceptor, onError, setLoadingState])

  return {
    loadingState,
    image,
  }
}
