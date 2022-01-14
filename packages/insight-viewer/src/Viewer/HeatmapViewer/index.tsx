import React, { useRef, ReactElement } from 'react'

import useHeatmapDrawing from '../../hooks/useHeatmapDrawing'

import { style } from './HeatmapViewer.styles'
import { HeatmapViewerProps } from './HeatmapViewer.types'

export function HeatmapViewer({
  posMap,
  threshold,
}: HeatmapViewerProps): ReactElement<HTMLCanvasElement> {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useHeatmapDrawing({ posMap, threshold, baseCanvas: canvasRef?.current })

  return <canvas data-cy-name="heatmap-canvas" ref={canvasRef} style={style} />
}
