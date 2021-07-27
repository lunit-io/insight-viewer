import { useState, useEffect } from 'react'
import {
  loadImage as cornerstoneLoadImage,
  CornerstoneImage,
} from '../../utils/cornerstoneHelper'
import getHttpClient from '../../utils/httpClient'
import { formatError } from '../../utils/common'
import { ViewerProp, RequestInterceptor } from '../../types'
import { LOADING_STATUS } from './const'
import { ImageLoadStatus } from '../useImageLoadStatus'

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
  setLoadingStatus,
}: Required<ViewerProp> & {
  setLoader: () => Promise<boolean>
  setLoadingStatus?: React.Dispatch<React.SetStateAction<ImageLoadStatus>>
}): CornerstoneImage | undefined {
  const [hasLoader, setHasLoader] = useState(false)
  const [image, setImage] = useState<CornerstoneImage>()

  // eslint-disable-next-line no-extra-semi
  ;(async function asyncLoad(): Promise<void> {
    if (!hasLoader) setHasLoader(await setLoader())
  })()

  useEffect(() => {
    if (!hasLoader) return
    setLoadingStatus?.(prev => ({
      ...prev,
      loadingStatus: LOADING_STATUS.LOADING,
    }))

    loadImage({
      imageId,
      requestInterceptor,
      onError,
    })
      .then(res => {
        setLoadingStatus?.(prev => ({
          ...prev,
          loadingStatus: LOADING_STATUS.SUCCESS,
          loaded: res,
        }))
        setImage(res)
      })
      .catch(() =>
        setLoadingStatus?.(prev => ({
          ...prev,
          status: LOADING_STATUS.FAIL,
        }))
      )
  }, [hasLoader, imageId, requestInterceptor, onError, setLoadingStatus])

  return image
}
