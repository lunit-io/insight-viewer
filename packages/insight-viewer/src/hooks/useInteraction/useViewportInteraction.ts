import { ViewportInteraction } from './types'
import useHandleDrag from './useHandleDrag'
import useHandleClick from './useHandleClick'
import useHandleWheel from './useHandleWheel'

export default function useViewportInteraction({
  element,
  interaction,
  viewport,
  onViewportChange,
  onFrameChange,
}: ViewportInteraction): void {
  useHandleWheel({
    element,
    interaction,
    onFrameChange,
  })

  useHandleDrag({
    element,
    interaction,
    onViewportChange,
  })
  useHandleClick({
    element,
    interaction,
    viewport,
  })
}
