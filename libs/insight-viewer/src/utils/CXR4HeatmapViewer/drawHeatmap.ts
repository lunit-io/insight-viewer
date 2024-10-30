/* eslint-disable no-param-reassign */

import { OverlayContext } from '../../contexts'
import clearHeatmap from './clearHeatmap'

interface DrawHeatmapProps extends Pick<OverlayContext, 'setToPixelCoordinateSystem' | 'enabledElement'> {
  baseCanvas: HTMLCanvasElement | null
  heatmapData: ImageData | null
  heatmapCanvas: HTMLCanvasElement | null
}

function drawHeatmap({
  baseCanvas,
  heatmapData,
  heatmapCanvas,
  enabledElement,
  setToPixelCoordinateSystem,
}: DrawHeatmapProps): void {
  if (!heatmapData || !baseCanvas || !heatmapCanvas || !enabledElement) return

  const baseCanvasContext = baseCanvas.getContext('2d')
  const heatmapCanvasContext = heatmapCanvas.getContext('2d')

  if (!baseCanvasContext || !heatmapCanvasContext) return

  clearHeatmap({ canvas: baseCanvas, context: baseCanvasContext })

  const { offsetWidth, offsetHeight } = baseCanvas

  baseCanvas.width = offsetWidth
  baseCanvas.height = offsetHeight
  heatmapCanvas.width = heatmapData.width
  heatmapCanvas.height = heatmapData.height

  baseCanvasContext.save()
  heatmapCanvasContext.putImageData(heatmapData, 0, 0)

  setToPixelCoordinateSystem(baseCanvasContext)

  baseCanvasContext.drawImage(
    heatmapCanvas,
    0,
    0,
    heatmapCanvas.width,
    heatmapCanvas.height,
    0,
    0,
    enabledElement.image?.width ?? 0,
    enabledElement.image?.height ?? 0
  )

  baseCanvasContext.restore()
}

export default drawHeatmap
