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
    element,
    interaction,
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
