/* eslint-disable prefer-destructuring */
/* eslint-disable one-var */
/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
import { getRGBArray } from './getRGBArray'

interface GetHeatmapImageDataProps {
  canvas: HTMLCanvasElement | null
  posMap: number[][]
  threshold: number
}

interface GetHeatmapImageDataReturn {
  heatmapData: ImageData | null
  heatmapCanvas: HTMLCanvasElement | null
}

export default function getHeatmapImageData({
  canvas,
  posMap,
  threshold,
}: GetHeatmapImageDataProps): GetHeatmapImageDataReturn {
  if (!canvas) {
    return { heatmapData: null, heatmapCanvas: null }
  }

  const heatmapWidth = posMap[0].length ?? 0
  const heatmapHeight = posMap.length ?? 0

  canvas.width = heatmapWidth
  canvas.height = heatmapHeight

  const heatmapCanvas = document.createElement('canvas')
  const heatmapImageData = canvas.getContext('2d')?.createImageData(heatmapWidth, heatmapHeight)
  const pixels = heatmapImageData?.data

  if (!heatmapImageData || !pixels) {
    return { heatmapData: null, heatmapCanvas: null }
  }

  // convert prob_map into a heatmap on the canvas
  for (let i = 0; i < heatmapHeight; i += 1) {
    for (let j = 0; j < heatmapWidth; j += 1) {
      const offset = (i * heatmapWidth + j) * 4
      const posProb = posMap[i][j]

      const thPosProb = (posProb - threshold) / (1 - threshold)
      if (posProb < threshold) {
        pixels[offset + 3] = 0
      } else {
        const pixVal = getRGBArray(thPosProb)

        pixels[offset] = pixVal[0]
        pixels[offset + 1] = pixVal[1]
        pixels[offset + 2] = pixVal[2]
        pixels[offset + 3] = (thPosProb * 196) << 0
      }
    }
  }

  return { heatmapData: heatmapImageData, heatmapCanvas }
}
