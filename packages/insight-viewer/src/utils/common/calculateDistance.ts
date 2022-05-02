/* eslint-disable no-restricted-properties */
import { Image } from '../../Viewer/types'

export function calculateDistance(radius: number, image: Image | null): number | null {
  return !image || !image.columnPixelSpacing
    ? null
    : Math.sqrt(Math.pow(radius, 2) / Math.pow(image?.columnPixelSpacing, 2))
}
