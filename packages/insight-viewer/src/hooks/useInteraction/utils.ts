import { Interaction } from './types'

export function preventContextMenu(e: Event): void {
  e.preventDefault()
}

export function hasInteraction(
  interaction: Interaction,
  interactionTypes: (keyof Interaction)[]
): boolean {
  const nonEmptyInteractionsTypes = Object.entries(interaction)
    .filter(([_, value]) => value !== undefined)
    .map(([k]) => k)

  return (
    interactionTypes.filter(type => nonEmptyInteractionsTypes.includes(type))
      .length > 0
  )
}
