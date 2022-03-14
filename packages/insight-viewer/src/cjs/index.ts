import { InsightViewer } from '../Viewer'
import { SvgContourViewer } from '../Viewer/SvgContourViewer'
import { SvgContourDrawer } from '../Viewer/SvgContourDrawer'
import { useMultipleImages } from '../hooks/useMultipleImages'
import { useViewport } from '../hooks/useViewport'
import { useInteraction } from '../hooks/useInteraction'
import { useContour } from '../hooks/useContour'
import { useImage } from '../hooks/useImage'
import { useFrame } from '../hooks/useFrame'
import { useDicomFile } from '../hooks/useDicomFile'
import { useOverlayContext } from '../contexts'

export type { Interaction, SetInteraction } from '../hooks/useInteraction/types'
export type { Viewport, ViewerError, Contours, Contour, Point } from '../types'
export type {
  DragEvent,
  Click,
  Drag,
  Wheel,
} from '../hooks/useInteraction/types'

export type { OverlayContext } from '../contexts'

Object.assign(InsightViewer, {
  SvgContourViewer,
  SvgContourDrawer,
  useMultipleImages,
  useViewport,
  useInteraction,
  useContour,
  useImage,
  useFrame,
  useDicomFile,
  useOverlayContext,
})

export default InsightViewer
