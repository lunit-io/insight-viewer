/* eslint-disable prefer-destructuring */
/* eslint-disable one-var */
/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */
import { useRef, useEffect, CSSProperties } from 'react'
import { useOverlayContext } from '@lunit/insight-viewer'
import posMap from './posMap'

const threshold = 0.1

const style: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
} as const

export function getRGBArray(value: number): number[] {
  let r = 1.0
  let g = 1.0
  let b = 1.0
  const v = Math.max(Math.min(value, 1), 0)
  if (v < 0.25) {
    r = 0
    g = 4 * v
  } else if (v < 0.5) {
    r = 0
    b = 1 + 4 * (0.25 - v)
  } else if (v < 0.75) {
    r = 4 * (v - 0.5)
    b = 0
  } else {
    g = 1 + 4 * (0.75 - v)
    b = 0
  }
  return [(r * 255) << 0, (g * 255) << 0, (b * 255) << 0]
}

function getHeatmapImageData({
  canvas,
}: {
  canvas: HTMLCanvasElement | null
}): ImageData | undefined {
  if (!canvas || !posMap) return undefined
  const heatmapWidth = posMap[0].length ?? 0
  const heatmapHeight = posMap.length ?? 0
  canvas.width = heatmapWidth
  canvas.height = heatmapHeight

  const heatmapImageData = canvas
    .getContext('2d')
    ?.createImageData(heatmapWidth, heatmapHeight)
  const pixels = heatmapImageData?.data

  if (!pixels) return undefined

  let offset, pixVal, posProb
  // convert prob_map into a heatmap on the canvas
  for (let i = 0; i < heatmapHeight; i += 1) {
    for (let j = 0; j < heatmapWidth; j += 1) {
      offset = (i * heatmapWidth + j) * 4
      posProb = posMap[i][j]
      const thPosProb = (posProb - threshold) / (1 - threshold)
      if (posProb < threshold) {
        pixels[offset + 3] = 0
      } else {
        pixVal = getRGBArray(thPosProb)
        pixels[offset] = pixVal[0]
        pixels[offset + 1] = pixVal[1]
        pixels[offset + 2] = pixVal[2]
        pixels[offset + 3] = (thPosProb * 196) << 0
      }
    }
  }
  return heatmapImageData
}

function clear(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D | null
) {
  if (!context) return
  context.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
}

function draw({
  cachedCanvas,
  drawingCanvas,
  heatmapData,
  setToPixelCoordinateSystem,
}: {
  cachedCanvas: HTMLCanvasElement | null
  drawingCanvas: HTMLCanvasElement
  heatmapData: ImageData | undefined
  setToPixelCoordinateSystem: (context: CanvasRenderingContext2D) => void
}) {
  if (!heatmapData || !cachedCanvas) return
  const context = cachedCanvas.getContext('2d')
  clear(cachedCanvas, context)
  const { offsetWidth, offsetHeight } = cachedCanvas
  cachedCanvas.width = offsetWidth
  cachedCanvas.height = offsetHeight
  context?.save()

  drawingCanvas.width = heatmapData.width
  drawingCanvas.height = heatmapData.height
  drawingCanvas.getContext('2d')?.putImageData(heatmapData, 0, 0)
  const ctx = drawingCanvas.getContext('2d')

  if (!context || !ctx) return
  setToPixelCoordinateSystem(ctx)

  if (offsetHeight >= offsetWidth) {
    const orgPadLength = (offsetHeight - offsetWidth) / 2
    const roiInPosMapWidth = Math.round(
      heatmapData.height * (offsetWidth / offsetHeight)
    )
    const padInPosMapLength = Math.round(
      orgPadLength * (heatmapData.height / offsetHeight)
    )

    context.drawImage(
      drawingCanvas,
      padInPosMapLength,
      0,
      roiInPosMapWidth,
      drawingCanvas.height,
      0,
      0,
      offsetWidth,
      offsetHeight
    )
  } else {
    const orgPadLength = (offsetWidth - offsetHeight) / 2
    const roiInPosMapHeight = Math.round(
      heatmapData.width * (offsetHeight / offsetWidth)
    )
    const padInPosMapLength = Math.round(
      orgPadLength * (heatmapData.height / offsetHeight)
    )
    context.drawImage(
      drawingCanvas,
      0,
      padInPosMapLength,
      heatmapData.width,
      roiInPosMapHeight,
      0,
      0,
      offsetWidth,
      offsetHeight
    )
  }
  context.restore()
}

export default function Heatmap(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cachedCanvas = canvasRef?.current
  const drawingCanvas = document.createElement('canvas')
  const { setToPixelCoordinateSystem } = useOverlayContext()

  useEffect(() => {
    const heatmapData = getHeatmapImageData({
      canvas: cachedCanvas,
    })

    draw({
      cachedCanvas,
      drawingCanvas,
      heatmapData,
      setToPixelCoordinateSystem,
    })
  }, [cachedCanvas, drawingCanvas, setToPixelCoordinateSystem])
  return <canvas ref={canvasRef} style={style} />
}
