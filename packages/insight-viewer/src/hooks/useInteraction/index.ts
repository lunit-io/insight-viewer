import { useState } from 'react'
import { Interaction } from './types'
import {
  PRIMARY_DRAG,
  SECONDARY_DRAG,
  PRIMARY_CLICK,
  SECONDARY_CLICK,
  MOUSEWHEEL,
} from './const'

export default function useInteraction(): {
  interaction: Interaction
  setInteraction: React.Dispatch<React.SetStateAction<Interaction>>
} {
  const [interaction, setInteraction] = useState<Interaction>({
    [PRIMARY_DRAG]: undefined,
    [SECONDARY_DRAG]: undefined,
    [PRIMARY_CLICK]: undefined,
    [SECONDARY_CLICK]: undefined,
    [MOUSEWHEEL]: undefined,
  })

  return {
    interaction,
    setInteraction,
  }
}
