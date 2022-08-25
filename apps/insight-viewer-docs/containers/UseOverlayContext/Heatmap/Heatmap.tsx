/* eslint-disable import/no-unresolved */
/* eslint-disable prefer-destructuring */
/* eslint-disable one-var */
/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */

/**
 * the example code of Heatmap Viewer
 */
import { useRef, useEffect, CSSProperties, useMemo } from 'react'
import { useOverlayContext, OverlayContext } from '@lunit/insight-viewer'
import posMap from './posMap'

interface HeatmapDrawProps extends Pick<OverlayContext, 'setToPixelCoordinateSystem' | 'enabledElement'> {
  baseCanvas: HTMLCanvasElement | null
  heatmapCanvas: HTMLCanvasElement | undefined
  heatmapData: ImageData | undefined
}

const threshold = 0.1

const style: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
} as const

// 특정 영역의 확률값(0~1)을 JET colormap 색상에 해당하는 [r, g, b] 배열로 바꿔주는 함수
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

function getHeatmapImageData({ canvas }: { canvas: HTMLCanvasElement | null }): {
  heatmapData: ImageData | undefined
  heatmapCanvas: HTMLCanvasElement | undefined
} {
  if (!canvas || !posMap) return { heatmapData: undefined, heatmapCanvas: undefined }
  const heatmapWidth = posMap[0].length ?? 0
  const heatmapHeight = posMap.length ?? 0
  canvas.width = heatmapWidth
  canvas.height = heatmapHeight
  const heatmapCanvas = document.createElement('canvas')
  const heatmapImageData = canvas.getContext('2d')?.createImageData(heatmapWidth, heatmapHeight)
  const pixels = heatmapImageData?.data

  if (!pixels) return { heatmapData: undefined, heatmapCanvas: undefined }

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
  return { heatmapData: heatmapImageData, heatmapCanvas }
}

function clear(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D | null) {
  if (!context) return
  context.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
}

function draw({
  baseCanvas,
  heatmapCanvas,
  heatmapData,
  setToPixelCoordinateSystem,
  enabledElement,
}: HeatmapDrawProps) {
  if (!heatmapData || !baseCanvas || !heatmapCanvas) return
  const baseCanvasContext = baseCanvas.getContext('2d')
  clear(baseCanvas, baseCanvasContext)
  const { offsetWidth, offsetHeight } = baseCanvas
  baseCanvas.width = offsetWidth
  baseCanvas.height = offsetHeight
  baseCanvasContext?.save()
  heatmapCanvas.width = heatmapData.width
  heatmapCanvas.height = heatmapData.height
  heatmapCanvas.getContext('2d')?.putImageData(heatmapData, 0, 0)
  const heatmapCanvasContext = heatmapCanvas.getContext('2d')
  if (!baseCanvasContext || !heatmapCanvasContext || !enabledElement) return

  setToPixelCoordinateSystem(baseCanvasContext)
  baseCanvasContext.drawImage(
    heatmapCanvas, // image
    0, // sx: s for source
    0, // sy
    heatmapCanvas.width, // sWidth
    heatmapCanvas.height, // sHeight
    0, // dx: d for destination
    0, // dy
    enabledElement.image?.width ?? 0, // dWidth
    enabledElement.image?.height ?? 0 // dHeight
  )

  baseCanvasContext.restore()
}

export default function Heatmap(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const baseCanvas = canvasRef?.current
  const { setToPixelCoordinateSystem, enabledElement, viewport } = useOverlayContext()
  const { hflip, vflip } = viewport
  const { heatmapData, heatmapCanvas } = useMemo(
    () =>
      getHeatmapImageData({
        canvas: baseCanvas,
      }),
    [baseCanvas]
  )

  useEffect(() => {
    draw({
      baseCanvas,
      heatmapCanvas,
      heatmapData,
      setToPixelCoordinateSystem,
      enabledElement,
    })
  }, [baseCanvas, heatmapCanvas, heatmapData, setToPixelCoordinateSystem, enabledElement, hflip, vflip])

  return <canvas ref={canvasRef} style={style} />
}
