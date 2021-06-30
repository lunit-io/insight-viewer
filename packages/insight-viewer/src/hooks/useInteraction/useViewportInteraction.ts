import { ViewportInteraction } from './types'
import useHandleDrag from './useHandleDrag'
import useHandleClick from './useHandleClick'

export default function useViewportInteraction({
  element,
  interaction,
  onViewportChange,
}: ViewportInteraction): void {
  useHandleDrag({
    element,
    interaction,
    onViewportChange,
  })
  useHandleClick(element, interaction)
}
