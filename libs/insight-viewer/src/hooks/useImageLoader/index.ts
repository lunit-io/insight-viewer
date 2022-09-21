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
    /*
      옵션이 바뀌더라도 loader 가 셋팅이 된 후에는 setWadoImageLoader 내부에서 옵션을 다시 바꿔주기 위해 worker를 다시 initialize 해주면 오류가 나기 때문에
      loader 가 셋팅이 되어있는 경우에는 옵션을 바꿔주지 않는다.
    */
    if (hasLoader) return
    loadImageLoader(imageId, onError, options).then(setHasLoader)
  }, [hasLoader, imageId, onError, options])

  return hasLoader
}
