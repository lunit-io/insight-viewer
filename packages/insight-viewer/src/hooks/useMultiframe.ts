import { useState } from 'react'

export interface UseMultiframe {
  (f?: number): {
    frame: number
    setFrame: (n: number) => void
  }
}

const useMultiframe: UseMultiframe = (initial = 0) => {
  const [frame, setFrame] = useState(initial)

  return {
    frame,
    setFrame,
  }
}

export default useMultiframe
