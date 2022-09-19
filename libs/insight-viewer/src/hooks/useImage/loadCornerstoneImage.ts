import { loadImage } from '../../utils/cornerstoneHelper'
import { normalizeError } from '../../utils/common'
import { GetImage } from './types'

/**
 * It calls cornerstone.js loadImage. It is pluggable for unit test.
 */
export const loadCornerstoneImage: GetImage = async ({ imageId, loader }) => {
  try {
    const loadedImage = await loadImage(imageId, { loader })

    return loadedImage
  } catch (e) {
    throw normalizeError(e)
  }
}
