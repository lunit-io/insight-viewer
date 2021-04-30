/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../@types/cornerstone-core/index.d.ts" />
/// <reference path="../@types/cornerstone-web-image-loader/index.d.ts" />
import { getCornerstone } from '../utils/cornerstoneHelper'
import useCornerstone from './useCornerstone'
import useLoadImage from './useLoadImage'
import { handleError } from '../utils/common'

async function setLoader(): Promise<boolean> {
  try {
    const cornerstoneWebImageLoader = await import(
      'cornerstone-web-image-loader'
    )
    // eslint-disable-next-line no-param-reassign
    cornerstoneWebImageLoader.external.cornerstone = getCornerstone()
    return true
  } catch (e) {
    handleError(e)
    return false
  }
}

export default async function useWebImageLoader(
  imageId: string,
  element: HTMLDivElement | null
): Promise<void> {
  useCornerstone(element)

  useLoadImage({
    imageId,
    element,
    setLoader,
  })
}
