import { useState } from 'react'
import { Interaction } from './types'
import { PRIMARY_DRAG, SECONDARY_DRAG, PRIMARY_CLICK, SECONDARY_CLICK, MOUSEWHEEL } from './const'

const DEFAULT_INTERACTION = {
  [PRIMARY_DRAG]: undefined,
  [SECONDARY_DRAG]: undefined,
  [PRIMARY_CLICK]: undefined,
  [SECONDARY_CLICK]: undefined,
  [MOUSEWHEEL]: undefined,
}

export function useInteraction(initialInteraction: Partial<Interaction> = {}): {
  interaction: Interaction
  setInteraction: React.Dispatch<React.SetStateAction<Interaction>>
} {
  const [interaction, setInteraction] = useState<Interaction>({
    ...DEFAULT_INTERACTION,
    ...initialInteraction,
  })

  return {
    interaction,
    setInteraction,
  }
}
