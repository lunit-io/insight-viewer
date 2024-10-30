/* eslint-disable no-param-reassign */
import { useEffect, useMemo, useRef, RefObject } from 'react'

import { HeatmapViewerProps } from './HeatmapViewer.types'
import { useOverlayContext } from '../../contexts'

import drawHeatmap from '../../utils/HeatmapViewer/drawHeatmap'
import getHeatmapImageData from '../../utils/HeatmapViewer/getHeatmapImageData'

function useHeatmapDrawing({ posMap, threshold }: HeatmapViewerProps): [RefObject<HTMLCanvasElement>] {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const baseCanvas = canvasRef?.current
  const { enabledElement, setToPixelCoordinateSystem } = useOverlayContext()
  const { heatmapData, heatmapCanvas } = useMemo(
    () =>
      getHeatmapImageData({
        posMap,
        threshold,
        canvas: baseCanvas,
      }),
    [posMap, threshold, baseCanvas]
  )

  useEffect(() => {
    drawHeatmap({
      baseCanvas,
      heatmapData,
      heatmapCanvas,
      enabledElement,
      setToPixelCoordinateSystem,
    })
  }, [baseCanvas, heatmapCanvas, heatmapData, setToPixelCoordinateSystem, enabledElement])

  return [canvasRef]
}

export default useHeatmapDrawing
