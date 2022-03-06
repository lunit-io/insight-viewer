import { InsightViewer } from '../Viewer'
import { Annotation } from '../Viewer/Annotation'
import { AnnotationViewer } from '../Viewer/AnnotationViewer'
import { AnnotationDrawer } from '../Viewer/AnnotationDrawer'
import { useMultipleImages } from '../hooks/useMultipleImages'
import { useViewport } from '../hooks/useViewport'
import { useInteraction } from '../hooks/useInteraction'
import { useAnnotation } from '../hooks/useAnnotation'
import { useImage } from '../hooks/useImage'
import { useFrame } from '../hooks/useFrame'
import { useDicomFile } from '../hooks/useDicomFile'
import { useOverlayContext } from '../contexts'

export type { Interaction, SetInteraction } from '../hooks/useInteraction/types'
export type { Viewport, ViewerError, Contours, Contour, Point } from '../types'
export type { DragEvent, Click, Drag, Wheel } from '../hooks/useInteraction/types'

export type { OverlayContext } from '../contexts'

Object.assign(InsightViewer, {
  Annotation,
  AnnotationViewer,
  AnnotationDrawer,
  useMultipleImages,
  useViewport,
  useInteraction,
  useAnnotation,
  useImage,
  useFrame,
  useDicomFile,
  useOverlayContext,
})

export default InsightViewer
