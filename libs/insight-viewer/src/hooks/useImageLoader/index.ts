/**
 * @fileoverview Enable Cornerstone image(Dicom/Web) loader.
 */
import { useState, useEffect } from 'react'
import { LOADER_TYPE } from '../../const'
import { OnError, ImageId } from '../../types'
import setWadoImageLoader, { WadoImageLoaderOptions } from '../../utils/cornerstoneHelper/setWadoImageLoader'
import setWebImageLoader from '../../utils/cornerstoneHelper/setWebImageLoader'
import { getLoaderType } from './getLoaderType'

type LoadImageLoader = (mageId: ImageId, onError: OnError, options?: WadoImageLoaderOptions) => Promise<boolean>
type UseImageLoader = (mageId: ImageId, onError: OnError, options?: WadoImageLoaderOptions) => boolean

const loadImageLoader: LoadImageLoader = async (imageId, onError, options) => {
  const loaderType = getLoaderType(imageId)
  const imageLoader =
    loaderType === LOADER_TYPE.DICOM ? await setWadoImageLoader(onError, options) : await setWebImageLoader(onError)

  return Boolean(imageLoader)
}

export const useImageLoader: UseImageLoader = (imageId, onError, options) => {
  const [hasLoader, setHasLoader] = useState(false)

  useEffect(() => {
    if (hasLoader) return
    loadImageLoader(imageId, onError, options).then(setHasLoader)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageId, onError, options])

  return hasLoader
}
