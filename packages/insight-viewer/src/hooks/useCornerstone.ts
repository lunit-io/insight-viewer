import { useEffect } from 'react'
import { enable, disable } from '../utils/cornerstoneHelper'

export default function useCornerstone(element: HTMLDivElement | null): void {
  useEffect(() => {
    if (!element) return undefined
    enable(element)

    return () => {
      disable(element)
    }
  }, [element])
}
