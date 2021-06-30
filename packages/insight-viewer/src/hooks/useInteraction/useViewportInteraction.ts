import { ViewportInteraction } from './types'
import useHandleDrag from './useHandleDrag'

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
}
