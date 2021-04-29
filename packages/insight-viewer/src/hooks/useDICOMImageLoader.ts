/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../@types/cornerstone-core/index.d.ts" />
/// <reference path="../@types/cornerstone-wado-image-loader/index.d.ts" />
import { getCornerstone } from '../utils/cornerstoneHelper'
import useCornerstone from './useCornerstone'
import useLoadImage from './useLoadImage'
import { handleError } from '../utils/common'

async function setLoader(): Promise<boolean> {
  try {
    const [cornerstoneWADOImageLoader, dicomParser] = await Promise.all([
      import('cornerstone-wado-image-loader'),
      import('dicom-parser'),
    ])
    // eslint-disable-next-line no-param-reassign
    cornerstoneWADOImageLoader.external.cornerstone = getCornerstone()
    // eslint-disable-next-line no-param-reassign
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser
    return true
  } catch (e) {
    handleError(e)
    return false
  }
}

export default async function useDICOMImageLoader(
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
