/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../@types/cornerstone-core/index.d.ts" />
/// <reference path="../@types/cornerstone-wado-image-loader/index.d.ts" />
import { setWadoImageLoader } from '../utils/cornerstoneHelper'
import useCornerstone from './useCornerstone'
import useImageLoader from './useImageLoader'
import { Element, ViewerProp } from '../types'

export default async function useDICOMImageLoader({
  imageId,
  element,
  onError,
  setHeader,
}: ViewerProp & {
  element: Element
}): Promise<void> {
  useCornerstone(element)
  useImageLoader({
    imageId,
    element,
    onError,
    setHeader,
    setLoader: () => setWadoImageLoader(onError),
  })
}
