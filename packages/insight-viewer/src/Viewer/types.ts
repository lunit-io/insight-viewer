import { CornerstoneImage } from '../utils/cornerstoneHelper'
import { ProgressComponent, Viewport, OnViewportChange } from '../types'
import { SetFrame } from '../hooks/useMultipleImages/useFrame'
import { Interaction } from '../hooks/useInteraction/types'

export type Image =
  | (CornerstoneImage & {
      _imageSeriesKey?: string
    })
  | undefined

export type ViewerProp = {
  image: Image
} & {
  Progress?: ProgressComponent
  viewport?: Viewport
  onViewportChange?: OnViewportChange
  onFrameChange?: SetFrame
  interaction?: Interaction
}
