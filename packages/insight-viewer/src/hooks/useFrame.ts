import { useState } from 'react'

export interface UseFrame {
  (f?: number): {
    frame: number
    setFrame: (n: number) => void
  }
}

const useFrame: UseFrame = (initial = 0) => {
  const [frame, setFrame] = useState(initial)

  return {
    frame,
    setFrame,
  }
}

export default useFrame
