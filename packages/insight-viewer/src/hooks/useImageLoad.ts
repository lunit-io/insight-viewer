import { useState, useEffect } from 'react'
import {
  loadImage as cornerstoneLoadImage,
  CornerstoneImage,
} from '../utils/cornerstoneHelper'
import getHttpClient from '../utils/httpClient'
import { formatError } from '../utils/common'
import { ViewerProp, RequestInterceptor } from '../types'

export const LOADING_STATUS = {
  INITIAL: 'initial',
  LOADING: 'loading',
  SUCCESS: 'success',
  FAIL: 'fail',
} as const

export type LoadingStatus = typeof LOADING_STATUS[keyof typeof LOADING_STATUS]
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
  imageId,
  requestInterceptor,
  setLoader,
  onError,
}: Required<ViewerProp> & {
  setLoader: () => Promise<boolean>
}): {
  loadingStatus: LoadingStatus
  image: CornerstoneImage | undefined
} {
  const [hasLoader, setHasLoader] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(
    LOADING_STATUS.INITIAL
  )
  const [image, setImage] = useState<CornerstoneImage>()

  // eslint-disable-next-line no-extra-semi
  ;(async function asyncLoad(): Promise<void> {
    if (!hasLoader) setHasLoader(await setLoader())
  })()

  useEffect(() => {
    if (!hasLoader) return
    setLoadingStatus(LOADING_STATUS.LOADING)

    loadImage({
      imageId,
      requestInterceptor,
      onError,
    })
      .then(res => {
        setLoadingStatus(LOADING_STATUS.SUCCESS)
        setImage(res)
      })
      .catch(() => setLoadingStatus(LOADING_STATUS.FAIL))
  }, [hasLoader, imageId, requestInterceptor, onError])

  return { loadingStatus, image }
}
