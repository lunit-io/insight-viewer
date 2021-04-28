import { useEffect } from 'react'
import { init, dispose } from '../modules/cornerstoneHelper'

export function useViewerLifecycle(
  ref: React.RefObject<HTMLDivElement>
): void {
  useEffect(() => {
    if (!ref || !ref.current) return undefined
    const element = ref.current
    init(element)

    return () => {
      dispose(element)
    }
  }, [ref])
}
