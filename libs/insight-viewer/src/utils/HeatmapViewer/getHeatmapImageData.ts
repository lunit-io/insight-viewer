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
        pixels[offset + 3] = Math.round(255 * 0.35)
      }
    }
  }

  // Apply Gaussian blur
  applyGaussianBlur(pixels, heatmapWidth, heatmapHeight, 1)

  return { heatmapData: heatmapImageData, heatmapCanvas }
}

function applyGaussianBlur(pixels: Uint8ClampedArray, width: number, height: number, sigma: number) {
  const kernel = generateGaussianKernel(sigma)
  const tempPixels = new Uint8ClampedArray(pixels.length)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      applyKernel(pixels, tempPixels, x, y, width, height, kernel, true)
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      applyKernel(tempPixels, pixels, x, y, width, height, kernel, false)
    }
  }
}

function generateGaussianKernel(sigma: number): number[] {
  const kernelSize = Math.ceil(sigma * 6) + 1
  const kernel = new Array(kernelSize).fill(0)
  const center = Math.floor(kernelSize / 2)

  let sum = 0
  for (let i = 0; i < kernelSize; i++) {
    const x = i - center
    kernel[i] = Math.exp(-(x * x) / (2 * sigma * sigma))
    sum += kernel[i]
  }

  // 정규화
  for (let i = 0; i < kernelSize; i++) {
    kernel[i] /= sum
  }

  return kernel
}

function applyKernel(
  src: Uint8ClampedArray,
  dst: Uint8ClampedArray,
  x: number,
  y: number,
  width: number,
  height: number,
  kernel: number[],
  horizontal: boolean
) {
  const center = Math.floor(kernel.length / 2)
  let r = 0,
    g = 0,
    b = 0,
    a = 0

  for (let i = 0; i < kernel.length; i++) {
    const ki = kernel[i]
    const xi = horizontal ? x + i - center : x
    const yi = horizontal ? y : y + i - center

    if (xi >= 0 && xi < width && yi >= 0 && yi < height) {
      const offset = (yi * width + xi) * 4
      r += src[offset] * ki
      g += src[offset + 1] * ki
      b += src[offset + 2] * ki
      a += src[offset + 3] * ki
    }
  }

  const offset = (y * width + x) * 4
  dst[offset] = r
  dst[offset + 1] = g
  dst[offset + 2] = b
  dst[offset + 3] = a
}
