/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../@types/cornerstone-core/index.d.ts" />
/// <reference path="../@types/cornerstone-web-image-loader/index.d.ts" />
import { useContext } from 'react'
import { getCornerstone } from '../utils/cornerstoneHelper'
import useCornerstone from './useCornerstone'
import useImageLoader from './useImageLoader'
import LoaderContext from '../Context'
import { OnError, Element, ViewerProp } from '../types'

async function setLoader(onError: OnError): Promise<boolean> {
  try {
    const cornerstoneWebImageLoader = await import(
      'cornerstone-web-image-loader'
    )
    // eslint-disable-next-line no-param-reassign
    cornerstoneWebImageLoader.external.cornerstone = getCornerstone()
    return true
  } catch (e) {
    onError(e)
    return false
  }
}

export default async function useWebImageLoader({
  imageId,
  element,
}: ViewerProp & {
  element: Element
}): Promise<void> {
  const { onError } = useContext(LoaderContext)

  useCornerstone(element)

  // TODO: 불필요한 매개변수 제거.
  useImageLoader({
    imageId,
    element,
    isSingleImage: true,
    onError,
    setHeader: () => {},
    setLoader: () => setLoader(onError),
  })
}
