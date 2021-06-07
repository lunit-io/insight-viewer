import { useEffect } from 'react'
import { Subscription } from 'rxjs'
import {
  getViewport,
  setViewport,
  CornerstoneViewport,
} from '../../utils/cornerstoneHelper'
import { viewportMessage } from '../../utils/messageService'
import { formatCornerstoneViewport } from '../../utils/common/formatViewport'
import { Element } from '../../types'
import { Viewport } from '../../Context/Viewport/types'

let subscription: Subscription

function updateViewport(element: Element, value: Partial<Viewport>) {
  const viewport = getViewport(<HTMLDivElement>element) as CornerstoneViewport

  if (viewport)
    setViewport(
      <HTMLDivElement>element,
      formatCornerstoneViewport(viewport, value)
    )
}

export default function useViewport(element: Element): void {
  useEffect(() => {
    if (!element) return undefined

    subscription = viewportMessage
      .getMessage()
      .subscribe((message: Partial<Viewport>) => {
        updateViewport(element, message)
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [element])
}
