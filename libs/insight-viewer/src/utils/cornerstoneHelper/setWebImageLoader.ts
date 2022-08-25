// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../@types/cornerstone-web-image-loader/index.d.ts" />
import { OnError } from '../../types'
import { normalizeError } from '../common'
import { getCornerstone } from './utils'

export type CornerstoneWebImageLoader = typeof import('cornerstone-web-image-loader')

export default async function setWebImageLoader(onError: OnError): Promise<CornerstoneWebImageLoader | undefined> {
  try {
    const cornerstoneWebImageLoader = await import('cornerstone-web-image-loader')
    // eslint-disable-next-line no-param-reassign
    cornerstoneWebImageLoader.external.cornerstone = getCornerstone()
    return cornerstoneWebImageLoader
  } catch (e) {
    onError(normalizeError(e))
    return undefined
  }
}
