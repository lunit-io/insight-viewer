/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../@types/cornerstone-core/index.d.ts" />
/// <reference path="../@types/cornerstone-wado-image-loader/index.d.ts" />
import { wadoImageLoader$ } from '../utils/cornerstoneHelper'
import useCornerstone from './useCornerstone'
import useLoadImage from './useLoadImage'

function setLoader() {
  return new Promise<boolean>(resolve =>
    wadoImageLoader$.subscribe(() => {
      resolve(true)
    })
  )
}

export default async function useDICOMImageLoader(
  imageId: string,
  element: HTMLDivElement | null
): Promise<void> {
  useCornerstone(element)

  useLoadImage({
    imageId,
    element,
    setLoader: () => setLoader(),
  })
}
