/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../@types/cornerstone-core/index.d.ts" />
/// <reference path="../@types/cornerstone-wado-image-loader/index.d.ts" />
import { useContext } from 'react'
import { getCornerstone } from '../utils/cornerstoneHelper'
import useCornerstone from './useCornerstone'
import useLoadImage from './useLoadImage'
import ViewContext from '../Viewer/Context'
import { OnError } from '../types'

async function setLoader(onError: OnError): Promise<boolean> {
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
    onError(e)
    return false
  }
}

export default async function useDICOMImageLoader(
  imageId: string,
  element: HTMLDivElement | null
): Promise<void> {
  const { onError } = useContext(ViewContext)

  useCornerstone(element)

  useLoadImage({
    imageId,
    element,
    setLoader: () => setLoader(onError),
  })
}
