import React, { ReactElement } from 'react'

import useHeatmapDrawing from '../../hooks/useHeatmapDrawing'

import { style } from './HeatmapViewer.styles'
import { HeatmapViewerProps } from './HeatmapViewer.types'

export function HeatmapViewer(
  props: HeatmapViewerProps
): ReactElement<HTMLCanvasElement> {
  const [canvasRef] = useHeatmapDrawing(props)

  return <canvas data-cy-name="heatmap-canvas" ref={canvasRef} style={style} />
}
