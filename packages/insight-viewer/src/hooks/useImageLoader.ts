/**
 * @fileoverview Enable Cornerstone image(Dicom/Web) loader.
 */
import { useState } from 'react'
import { LOADER_TYPE } from '../const'
import { LoaderType, OnError } from '../types'
import setWadoImageLoader from '../utils/cornerstoneHelper/setWadoImageLoader'
import setWebImageLoader from '../utils/cornerstoneHelper/setWebImageLoader'

export function useImageLoader(type: LoaderType, onError: OnError): boolean {
  const [hasLoader, setHasLoader] = useState(false)

  const loader =
    type === LOADER_TYPE.DICOM ? setWadoImageLoader : setWebImageLoader

  // eslint-disable-next-line no-extra-semi
  ;(async function asyncLoad(): Promise<void> {
    if (!hasLoader) setHasLoader(await loader(onError))
  })()

  return hasLoader
}
