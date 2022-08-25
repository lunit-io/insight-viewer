/**
 * @fileoverview Handles frame of multi-frame image viewer.
 */
import { useState, Dispatch, SetStateAction } from 'react'

export type SetFrame = Dispatch<SetStateAction<number>>

export interface UseFrame {
  (f: number): {
    frame: number
    setFrame: SetFrame
  }
}

const useFrame: UseFrame = (initial) => {
  const [frame, setFrame] = useState(initial)

  return {
    frame,
    setFrame,
  }
}

export default useFrame
