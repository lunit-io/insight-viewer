// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../@types/cornerstone-web-image-loader/index.d.ts" />
import { OnError } from '../../types'
import { normalizeError } from '../common'
import { getCornerstone } from './utils'

export default async function setWebImageLoader(
  onError: OnError
): Promise<boolean> {
  try {
    const cornerstoneWebImageLoader = await import(
      'cornerstone-web-image-loader'
    )
    // eslint-disable-next-line no-param-reassign
    cornerstoneWebImageLoader.external.cornerstone = getCornerstone()
    return true
  } catch (e) {
    onError(normalizeError(e))
    return false
  }
}
