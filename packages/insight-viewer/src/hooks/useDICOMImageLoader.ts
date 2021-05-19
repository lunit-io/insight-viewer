/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../@types/cornerstone-core/index.d.ts" />
/// <reference path="../@types/cornerstone-wado-image-loader/index.d.ts" />
import { useContext } from 'react'
import { setWadoImageLoader } from '../utils/cornerstoneHelper'
import useCornerstone from './useCornerstone'
import useLoadImage from './useLoadImage'
import ViewContext from '../Viewer/Context'

export default async function useDICOMImageLoader(
  imageId: string,
  element: HTMLDivElement | null
): Promise<void> {
  const { onError } = useContext(ViewContext)
  useCornerstone(element)

  useLoadImage({
    imageId,
    element,
    setLoader: () => setWadoImageLoader(onError),
  })
}
