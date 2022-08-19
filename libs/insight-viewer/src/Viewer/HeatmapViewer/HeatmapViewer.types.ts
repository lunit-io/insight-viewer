import { OverlayContext } from '../../contexts'

export interface HeatmapViewerProps {
  /** Heatmap data format resulting from AI */
  posMap: number[][]

  /** Threshold value (CXR = 0.15, MMG = 0.1) */
  threshold: number
}

export interface HeatmapDrawProps extends Pick<OverlayContext, 'setToPixelCoordinateSystem' | 'enabledElement'> {
  baseCanvas: HTMLCanvasElement | null
  heatmapData: ImageData | undefined
}
