import { useRef, useEffect } from 'react'

import { useOverlayContext } from '@lunit/insight-viewer'

import type { MouseEvent } from 'react'
import type { Point } from '../../types'

export interface UseAnnotationEventParams {
  mouseDownCallback: (point: Point) => void
  mouseMoveCallback: (point: Point) => void
  mouseUpCallback: () => void
  mouseLeaveCallback: () => void
  keyDownCallback: (event: KeyboardEvent) => void
}

const useMouseEvent = ({
  mouseDownCallback,
  mouseMoveCallback,
  mouseLeaveCallback,
  mouseUpCallback,
  keyDownCallback,
}: UseAnnotationEventParams) => {
  // UseRef to avoid repeating event subscriptions and re-subscriptions
  const keydownCallbackRef = useRef(keyDownCallback)

  const { pageToPixel } = useOverlayContext()

  const onMouseDown = (event: MouseEvent) => {
    // Apply Drawing only when left mouse button is pressed
    if (event.button !== 0) return

    const point = pageToPixel([event.pageX, event.pageY])

    mouseDownCallback(point)
  }

  const onMouseMove = (event: MouseEvent) => {
    // Apply Drawing only when left mouse button is pressed
    if (event.button !== 0) return

    const point = pageToPixel([event.pageX, event.pageY])

    mouseMoveCallback(point)
  }

  const onMouseLeave = () => {
    mouseLeaveCallback()
  }

  const onMouseUp = () => {
    mouseUpCallback()
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      keydownCallbackRef.current(event)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [keydownCallbackRef])

  return {
    onMouseDown,
    onMouseMove,
    onMouseLeave,
    onMouseUp,
  }
}

export default useMouseEvent
