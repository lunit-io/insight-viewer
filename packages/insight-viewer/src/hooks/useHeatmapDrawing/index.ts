/* eslint-disable no-param-reassign */
import { useEffect, useMemo } from 'react'

import { UseHeatmapDrawingProps } from './types'
import { useOverlayContext } from '../../contexts'

import drawHeatmap from '../../utils/HeatmapViewer/drawHeatmap'
import getHeatmapImageData from '../../utils/HeatmapViewer/getHeatmapImageData'

function useHeatmapDrawing({
  posMap,
  threshold,
  baseCanvas,
}: UseHeatmapDrawingProps): void {
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
  }, [
    baseCanvas,
    heatmapCanvas,
    heatmapData,
    setToPixelCoordinateSystem,
    enabledElement,
  ])
}

export default useHeatmapDrawing
