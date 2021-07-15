// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../@types/cornerstone-wado-image-loader/index.d.ts" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../@types/dicom-parser/index.d.ts" />
import { OnError } from '../../types'
import { getCornerstone } from './utils'

export default async function setWadoImageLoader(
  onError: OnError
): Promise<boolean> {
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
