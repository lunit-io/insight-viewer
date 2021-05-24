import { useEffect } from 'react'
import { Subscription } from 'rxjs'
import { enable, disable } from '../utils/cornerstoneHelper'
import { cornerstoneMessage } from '../utils/messageService/cornerstone'

let subscription: Subscription

export default function useCornerstone(element: HTMLDivElement | null): void {
  useEffect(() => {
    if (!element) return undefined

    subscription = cornerstoneMessage
      .getMessage()
      .subscribe((message: boolean) => {
        if (message) enable(element)
        if (!message) disable(element)
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [element])
}
