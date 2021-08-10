import { useState, Dispatch, SetStateAction } from 'react'

export type SetFrame = Dispatch<SetStateAction<number>>

export interface UseFrame {
  (f: { initial: number; max: number }): {
    frame: number
    setFrame: SetFrame
  }
}

export const useFrame: UseFrame = ({ initial = 0, max }) => {
  const [frame, setFrame] = useState(initial)

  function handleFrame(arg: SetStateAction<number>) {
    let frameIndex = 0

    if (typeof arg === 'number') {
      frameIndex = arg
    } else {
      frameIndex = arg(frame)
    }

    if (frameIndex < 0 || frameIndex > max) return
    setFrame(arg)
  }

  return {
    frame,
    setFrame: handleFrame,
  }
}
