/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../../@types/cornerstone-core/index.d.ts" />
/// <reference path="../../@types/cornerstone-web-image-loader/index.d.ts" />
import { OnError } from '../../types'
import { getCornerstone } from './utils'

export async function setWebImageLoader(onError: OnError): Promise<boolean> {
  try {
    const cornerstoneWebImageLoader = await import(
      'cornerstone-web-image-loader'
    )
    // eslint-disable-next-line no-param-reassign
    cornerstoneWebImageLoader.external.cornerstone = getCornerstone()
    return true
  } catch (e) {
    onError(e)
    return false
  }
}
