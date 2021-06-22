import { useState } from 'react'
import { Interaction } from './types'

export default function useInteraction(): {
  interaction: Interaction
  setInteraction: React.Dispatch<React.SetStateAction<Interaction>>
} {
  const [interaction, setInteraction] = useState<Interaction>({
    mouseDownMove: undefined,
    mouseWheel: undefined,
  })

  return {
    interaction,
    setInteraction,
  }
}
