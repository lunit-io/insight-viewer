import { Element } from '../../types'
import { Interaction } from './types'
import handleMouseDown from './handleMouseDown'

export default function useViewportInteraction(
  element: Element,
  interaction?: Interaction
): void {
  if (!element || !interaction) return

  handleMouseDown(element, interaction.mouseDownMove)
}
