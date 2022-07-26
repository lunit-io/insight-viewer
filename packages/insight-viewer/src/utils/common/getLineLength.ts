/* eslint-disable no-restricted-properties */
import { Point, RulerCalcOption } from '../../types'
import { Image } from '../../Viewer/types'
import { IMAGER_PIXEL_SPACING } from './const'

const calcLength = ([startX, startY]: Point, [endX, endY]: Point, col: number, row: number): number => {
  const xPow = Math.pow(Math.abs(endX - startX) * col, 2)
  const yPow = Math.pow(Math.abs(endY - startY) * row, 2)

  return Number(Math.sqrt(xPow + yPow).toFixed(2))
}

export function getLineLength(
  startPoint: Point,
  endPoint: Point,
  currentImage: Image | null,
  kind: RulerCalcOption['kind']
): number {
  if (!currentImage) {
    return calcLength(startPoint, endPoint, 1, 1)
  }

  if (kind === 'pixelSpacing') {
    const { columnPixelSpacing, rowPixelSpacing } = currentImage

    return calcLength(startPoint, endPoint, columnPixelSpacing, rowPixelSpacing)
  }

  if (kind === 'imagerPixelSpacing') {
    const imagerPixelSpacing = currentImage.data.elements[IMAGER_PIXEL_SPACING] as unknown as [number, number]

    const [columnPixelSpacing, rowPixelSpacing] = imagerPixelSpacing

    return calcLength(startPoint, endPoint, columnPixelSpacing, rowPixelSpacing)
  }

  return calcLength(startPoint, endPoint, 1, 1)
}
