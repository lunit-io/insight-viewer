/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../@types/cornerstone-core/index.d.ts" />
/// <reference path="../@types/cornerstone-web-image-loader/index.d.ts" />
import { useContext } from 'react'
import { getCornerstone } from '../utils/cornerstoneHelper'
import useCornerstone from './useCornerstone'
import useImageLoader from './useImageLoader'
import ViewContext from '../Context'
import { OnError } from '../types'

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

export default async function useWebImageLoader(
  imageId: string,
  element: HTMLDivElement | null
): Promise<void> {
  const { onError } = useContext(ViewContext)

  useCornerstone(element)

  useImageLoader({
    imageId,
    element,
    setLoader: () => setLoader(onError),
  })
}
