/* eslint-disable no-restricted-properties */
import { Point, RulerCalcOption } from '../../types'
import { Image } from '../../Viewer/types'
import { IMAGER_PIXEL_SPACING } from './const'

const calcRadius = (x: number, y: number, col: number, row: number) => {
  const radius = Math.sqrt(Math.pow(Math.abs(x) * col, 2) + Math.pow(Math.abs(y) * row, 2))

  return Number(radius.toFixed(2))
}

export function getCircleRadius(
  startPoint: Point,
  endPoint: Point,
  currentImage: Image | null,
  kind: RulerCalcOption['kind']
): number {
  const [x1, y1] = startPoint
  const [x2, y2] = endPoint

  const x = x2 - x1
  const y = y2 - y1

  if (!currentImage) {
    return calcRadius(x, y, 1, 1)
  }

  if (kind === 'pixelSpacing') {
    const { columnPixelSpacing, rowPixelSpacing } = currentImage

    return calcRadius(x, y, columnPixelSpacing, rowPixelSpacing)
  }

  if (kind === 'imagerPixelSpacing') {
    const imagerPixelSpacing = currentImage.data.elements[IMAGER_PIXEL_SPACING] as unknown as [number, number]

    const [columnPixelSpacing, rowPixelSpacing] = imagerPixelSpacing

    return calcRadius(x, y, columnPixelSpacing, rowPixelSpacing)
  }

  return calcRadius(x, y, 1, 1)
}
