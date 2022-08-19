/**
 * @fileoverview Enable Cornerstone image(Dicom/Web) loader.
 */
import { useState } from 'react'
import { LOADER_TYPE } from '../../const'
import { OnError, ImageId } from '../../types'
import setWadoImageLoader, { WadoImageLoaderOptions } from '../../utils/cornerstoneHelper/setWadoImageLoader'
import setWebImageLoader from '../../utils/cornerstoneHelper/setWebImageLoader'
import { getLoaderType } from './getLoaderType'

export function useImageLoader(imageId: ImageId, onError: OnError, options?: WadoImageLoaderOptions): boolean {
  const [hasLoader, setHasLoader] = useState(false)
  const loaderType = getLoaderType(imageId)

  // eslint-disable-next-line no-extra-semi
  ;(async function asyncLoad(): Promise<void> {
    if (!hasLoader) {
      const imageLoader =
        loaderType === LOADER_TYPE.DICOM ? await setWadoImageLoader(onError, options) : await setWebImageLoader(onError)
      setHasLoader(!!imageLoader)
    }
  })()

  return hasLoader
}
