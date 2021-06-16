/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../../@types/cornerstone-core/index.d.ts" />
/// <reference path="../../@types/cornerstone-wado-image-loader/index.d.ts" />
import { OnError } from '../../types'
import { getCornerstone } from './utils'

export async function setWadoImageLoader(onError: OnError): Promise<boolean> {
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
