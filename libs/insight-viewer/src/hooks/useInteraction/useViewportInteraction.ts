import { ViewportInteraction } from './types'
import useHandleDrag from './useHandleDrag'
import useHandleClick from './useHandleClick'
import useHandleWheel from './useHandleWheel'

export default function useViewportInteraction({
  element,
  image,
  interaction,
  viewport,
  onViewportChange,
}: ViewportInteraction): void {
  useHandleWheel({
    image,
    element,
    interaction,
    onViewportChange,
  })
  useHandleDrag({
    image,
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
