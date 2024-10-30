import React, { ReactElement } from 'react'

import useHeatmapDrawing from './useHeatmapDrawing'
import { style } from './HeatmapViewer.styles'

import type { HeatmapViewerProps } from './HeatmapViewer.types'

export function LegacyHeatmapViewer(props: HeatmapViewerProps): ReactElement<HTMLCanvasElement> {
  const [canvasRef] = useHeatmapDrawing(props)

  return <canvas data-cy-name="heatmap-canvas" ref={canvasRef} style={style} />
}
