/**
 * @fileoverview Enable the HTML Element for use in Cornerstone. Disable it on unmount.
 */
import { useEffect } from 'react'
import { enable, disable } from '../utils/cornerstoneHelper'
import { Element } from '../types'

export default function useCornerstone(element: Element): void {
  useEffect(() => {
    if (!element) return undefined
    enable(element)

    return () => {
      disable(element)
    }
  }, [element])
}
