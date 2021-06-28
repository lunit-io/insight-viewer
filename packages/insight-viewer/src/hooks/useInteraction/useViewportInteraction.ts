import { Element } from '../../types'
import { Interaction } from './types'
import handleDrag from './handleDrag'

export default function useViewportInteraction(
  element: Element,
  interaction?: Interaction
): void {
  if (!element || !interaction) return

  handleDrag(element, interaction)
}
