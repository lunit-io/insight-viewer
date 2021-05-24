import { useEffect } from 'react'
import {
  getViewport,
  setViewport,
  EVENT,
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
  return {
    [key]: value,
  }
}

export default function useViewportUpdate(
  element: HTMLDivElement | null
): void {
  useEffect(() => {
    if (!element) return undefined

    function onRender(): void {
      viewportMessage
        .getMessage()
        .subscribe(({ key, value }: ViewportMessageProp) => {
          const viewport = getViewport(<HTMLDivElement>element)

          if (viewport)
            setViewport(<HTMLDivElement>element, {
              ...viewport,
              ...format(key, value, viewport),
            })
        })
    }

    element.addEventListener(EVENT.IMAGE_RENDERED, onRender)

    return () => {
      element.removeEventListener(EVENT.IMAGE_RENDERED, onRender)
    }
  }, [element])
}
