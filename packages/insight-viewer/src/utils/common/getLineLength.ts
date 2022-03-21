/* eslint-disable no-restricted-properties */
import { Point } from '../../types'
import { CornerstoneImage } from '../cornerstoneHelper'

export function getLineLength(startPoint: Point, endPoint: Point, currentImage: CornerstoneImage): number | null {
  if (!currentImage.columnPixelSpacing || !currentImage.rowPixelSpacing) {
    return null
  }

  const [startX, startY] = startPoint
  const [endX, endY] = endPoint
  const xPow = Math.pow(Math.abs(endX - startX) * currentImage.columnPixelSpacing, 2)
  const yPow = Math.pow(Math.abs(endY - startY) * currentImage.rowPixelSpacing, 2)

  return Math.sqrt(xPow + yPow)
}
