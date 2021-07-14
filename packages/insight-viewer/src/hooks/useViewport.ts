import { useState, useRef, useEffect } from 'react'
import { Viewport, BasicViewport } from '../types'
import { DefaultViewport } from '../const'

export default function useViewport(initial?: Partial<BasicViewport>): {
  viewport: Viewport
  setViewport: React.Dispatch<React.SetStateAction<Viewport>>
  resetViewport: () => void
} {
  const [viewport, setViewport] = useState({
    ...DefaultViewport,
    ...(initial ? { _initial: initial } : {}),
  })
  const [initialViewport, setInitialViewport] = useState<Viewport>()
  const countRef = useRef(0)

  function resetViewport() {
    if (initialViewport) {
      setViewport(initialViewport)
    }
  }

  // Viewport initial value
  // 1. DefaultViewport: For preventing 'cannot read property of undefined' errors. { scale, invert... }
  // 2. User-defined initial Viewport + image meta data from cornerstone.js.
  //    This should be used as initial value for viewport reset.
  useEffect(() => {
    countRef.current += 1
    if (countRef.current === 2) setInitialViewport(viewport)
  }, [viewport])

  return {
    viewport,
    setViewport,
    resetViewport,
  }
}
