/**
 * @fileoverview Get the image's default viewport with cornerstone.js. This is required when resetting viewport.
 */
import { useRef, MutableRefObject, useEffect } from 'react'
import { Subscription } from 'rxjs'
import { defaultViewportMessage } from '../utils/messageService'
import { CornerstoneViewport } from '../utils/cornerstoneHelper'

let subscription: Subscription

export default function useDefaultViewport(): MutableRefObject<
  CornerstoneViewport | undefined
> {
  const defaultViewporRef = useRef<CornerstoneViewport>()

  useEffect(() => {
    subscription = defaultViewportMessage
      .getMessage()
      .subscribe((message: CornerstoneViewport) => {
        defaultViewporRef.current = message
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return defaultViewporRef
}
