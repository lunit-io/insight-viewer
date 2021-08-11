import { CornerstoneImage } from '../utils/cornerstoneHelper'
import { ProgressComponent, Viewport, OnViewportChange } from '../types'
import { SetFrame } from '../hooks/useMultipleImages/useFrame'
import { Interaction } from '../hooks/useInteraction/types'

export type ViewerProp = {
  image: CornerstoneImage | undefined
} & {
  Progress?: ProgressComponent
  viewport?: Viewport
  onViewportChange?: OnViewportChange
  onFrameChange?: SetFrame
  interaction?: Interaction
}
