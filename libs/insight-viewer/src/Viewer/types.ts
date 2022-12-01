import { DataSet } from 'dicom-parser'
import { CornerstoneImage } from '../utils/cornerstoneHelper'
import { ProgressComponent, Viewport, OnViewportChange } from '../types'
import { SetFrame } from '../hooks/useMultipleImages/useFrame'
import { Interaction } from '../hooks/useInteraction/types'

import type { MutableRefObject } from 'react'

export type Image = (CornerstoneImage & { _imageSeriesKey?: string; data: DataSet }) | undefined
export type ImageWithoutKey = CornerstoneImage & { data: DataSet }

export type ViewerProp = {
  image: Image
} & {
  Progress?: ProgressComponent
  viewport?: Viewport
  onViewportChange?: OnViewportChange
  onFrameChange?: SetFrame
  interaction?: Interaction
  viewerRef?: MutableRefObject<HTMLDivElement | null>
}
