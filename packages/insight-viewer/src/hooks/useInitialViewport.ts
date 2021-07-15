import { useRef, MutableRefObject, useEffect } from 'react'
import { Subscription } from 'rxjs'
import { initialViewportMessage } from '../utils/messageService'
import { CornerstoneViewport } from '../utils/cornerstoneHelper'

let subscription: Subscription

export default function useInitialViewport(): MutableRefObject<
  CornerstoneViewport | undefined
> {
  const initialViewporRef = useRef<CornerstoneViewport>()

  useEffect(() => {
    subscription = initialViewportMessage
      .getMessage()
      .subscribe((message: CornerstoneViewport) => {
        initialViewporRef.current = message
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return initialViewporRef
}
