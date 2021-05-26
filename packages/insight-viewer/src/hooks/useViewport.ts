import { useEffect } from 'react'
import { Subscription } from 'rxjs'
import {
  getViewport,
  setViewport,
  CornerstoneViewport,
} from '../utils/cornerstoneHelper'
import { viewportMessage } from '../utils/messageService'
import { ViewportMessageProp } from '../utils/messageService/viewport'

function format(
  key: string,
  value: unknown,
  viewport: CornerstoneViewport
): Record<string, unknown> {
  if (key === 'x' || key === 'y') {
    return {
      translation: {
        ...viewport.translation,
        [key]: value,
      },
    }
  }
  if (key === 'windowWidth' || key === 'windowCenter') {
    return {
      voi: {
        ...viewport.voi,
        [key]: value,
      },
    }
  }

  return {
    [key]: value,
  }
}

let subscription: Subscription

export default function useViewport(element: HTMLDivElement | null): void {
  useEffect(() => {
    if (!element) return undefined

    subscription = viewportMessage
      .getMessage()

      .subscribe(({ key, value }: ViewportMessageProp) => {
        const viewport = getViewport(<HTMLDivElement>element)

        if (viewport)
          setViewport(<HTMLDivElement>element, {
            ...viewport,
            ...format(key, value, viewport),
          })
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [element])
}
