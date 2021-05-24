/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../@types/cornerstone-core/index.d.ts" />
/// <reference path="../@types/cornerstone-wado-image-loader/index.d.ts" />
import { useContext } from 'react'
import { setWadoImageLoader } from '../utils/cornerstoneHelper'
import useCornerstone from './useCornerstone'
import useImageLoader from './useImageLoader'
import useViewportUpdate from './useViewportUpdate'
import ViewContext from '../Context'

interface Prop {
  imageId: string
  element: HTMLDivElement | null
  isSingleImage: boolean
}

export default async function useDICOMImageLoader({
  imageId,
  element,
  isSingleImage,
}: Prop): Promise<void> {
  const { onError } = useContext(ViewContext)
  useCornerstone(element)

  const isImageLoaded = useImageLoader({
    imageId,
    element,
    setLoader: () => setWadoImageLoader(onError),
    isSingleImage,
  })

  useViewportUpdate({
    element,
    isLoaded: isImageLoaded,
  })
}
