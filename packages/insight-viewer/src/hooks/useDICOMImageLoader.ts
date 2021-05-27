/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../@types/cornerstone-core/index.d.ts" />
/// <reference path="../@types/cornerstone-wado-image-loader/index.d.ts" />
import { useContext } from 'react'
import { setWadoImageLoader } from '../utils/cornerstoneHelper'
import useCornerstone from './useCornerstone'
import useImageLoader from './useImageLoader'
import ViewContext from '../Context'
import { Element } from '../types'

interface Prop {
  imageId: string
  element: Element
  isSingleImage: boolean
}

export default async function useDICOMImageLoader({
  imageId,
  element,
  isSingleImage,
}: Prop): Promise<void> {
  const { onError } = useContext(ViewContext)
  useCornerstone(element)

  useImageLoader({
    imageId,
    element,
    setLoader: () => setWadoImageLoader(onError),
    isSingleImage,
  })
}
