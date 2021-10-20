// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../@types/cornerstone-wado-image-loader/index.d.ts" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../@types/dicom-parser/index.d.ts" />
import { OnError } from '../../types'
import { normalizeError } from '../common'
import { getCornerstone } from './utils'

export type CornerstoneWadoImageLoader =
  typeof import('cornerstone-wado-image-loader')

export default async function setWadoImageLoader(
  onError: OnError
): Promise<CornerstoneWadoImageLoader | undefined> {
  try {
    const [cornerstoneWADOImageLoader, dicomParser] = await Promise.all([
      import('cornerstone-wado-image-loader'),
      import('dicom-parser'),
    ])
    // eslint-disable-next-line no-param-reassign
    cornerstoneWADOImageLoader.external.cornerstone = getCornerstone()
    // eslint-disable-next-line no-param-reassign
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser
    return cornerstoneWADOImageLoader
  } catch (e) {
    onError(normalizeError(e))
    return undefined
  }
}
