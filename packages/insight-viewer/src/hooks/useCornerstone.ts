import { useEffect } from 'react'
import { init, dispose } from '../utils/cornerstoneHelper'

export default function useCornerstone(element: HTMLDivElement | null): void {
  useEffect(() => {
    if (!element) return undefined
    init(element)

    return () => {
      dispose(element)
    }
  }, [element])
}
