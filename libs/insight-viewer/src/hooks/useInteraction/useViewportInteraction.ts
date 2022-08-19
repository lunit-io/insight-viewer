import { ViewportInteraction } from './types'
import useHandleDrag from './useHandleDrag'
import useHandleClick from './useHandleClick'
import useHandleWheel from './useHandleWheel'

export default function useViewportInteraction({
  element,
  interaction,
  viewport,
  onViewportChange,
}: ViewportInteraction): void {
  useHandleWheel({
    element,
    interaction,
    onViewportChange,
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
