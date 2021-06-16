import { useState } from 'react'

export type SetFrame = (n: number) => void

export interface UseFrame {
  (f: number): {
    frame: number
    setFrame: SetFrame
  }
}

const useFrame: UseFrame = initial => {
  const [frame, setFrame] = useState(initial)

  return {
    frame,
    setFrame,
  }
}

export default useFrame
