import { InsightViewer } from './Viewer'
import { AnnotationOverlay } from './Viewer/AnnotationOverlay'
import { AnnotationViewer } from './Viewer/AnnotationViewer'
import { AnnotationDrawer } from './Viewer/AnnotationDrawer'
import { MeasurementOverlay } from './Viewer/MeasurementOverlay'
import { MeasurementViewer } from './Viewer/MeasurementViewer'
import { MeasurementDrawer } from './Viewer/MeasurementDrawer'
import { HeatmapViewer } from './Viewer/HeatmapViewer'
import { useMultipleImages } from './hooks/useMultipleImages'
import { useViewport } from './hooks/useViewport'
import { useInteraction } from './hooks/useInteraction'
import { useAnnotation } from './hooks/useAnnotation'
import { useMeasurement } from './hooks/useMeasurement'
import { useImage } from './hooks/useImage'
import { useFrame } from './hooks/useFrame'
import { useDicomFile } from './hooks/useDicomFile'
import { useOverlayContext } from './contexts'

export type { Interaction, SetInteraction } from './hooks/useInteraction/types'
export type {
  Viewport,
  ViewerError,
  Contours,
  Annotation,
  Point,
  LineHeadMode,
  AnnotationBase,
  PolygonAnnotation,
  LineAnnotation,
  FreeLineAnnotation,
  CircleAnnotation,
  AnnotationMode,
  AnnotationViewerProps,
  Measurement,
  MeasurementBase,
  MeasurementMode,
  RulerMeasurement,
  CircleMeasurement,
} from './types'
export type { DragAction, DragEvent, Click, Drag, Wheel } from './hooks/useInteraction/types'
export type { OverlayContext } from './contexts'

Object.assign(InsightViewer, {
  AnnotationOverlay,
  AnnotationViewer,
  AnnotationDrawer,
  MeasurementOverlay,
  MeasurementViewer,
  MeasurementDrawer,
  HeatmapViewer,
  useMultipleImages,
  useViewport,
  useInteraction,
  useAnnotation,
  useMeasurement,
  useImage,
  useFrame,
  useDicomFile,
  useOverlayContext,
})

export default InsightViewer
