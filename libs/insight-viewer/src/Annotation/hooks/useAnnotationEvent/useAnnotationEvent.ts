import { useOverlayContext } from '../../../contexts'

import type { MouseEvent, KeyboardEvent } from 'react'
import type { Point } from '../../../types'

export interface UseAnnotationEventParams {
  mouseDownCallback: (point: Point) => void
  mouseMoveCallback: (point: Point) => void
  mouseUpCallback: () => void
  mouseLeaveCallback: () => void
  keyDownCallback: (event: KeyboardEvent) => void
}

const setPreProcessEvent = (event: MouseEvent | KeyboardEvent) => {
  event.preventDefault()
  event.stopPropagation()
}

const useAnnotationEvent = ({
  mouseDownCallback,
  mouseMoveCallback,
  mouseLeaveCallback,
  mouseUpCallback,
  keyDownCallback,
}: UseAnnotationEventParams) => {
  const { pageToPixel } = useOverlayContext()

  const handleMouseDown = (event: MouseEvent) => {
    // Apply Drawing only when left mouse button is pressed
    if (event.button !== 0) return

    setPreProcessEvent(event)

    const point = pageToPixel([event.pageX, event.pageY])

    mouseDownCallback(point)
  }

  const handleMouseMove = (event: MouseEvent) => {
    // Apply Drawing only when left mouse button is pressed
    if (event.button !== 0) return

    setPreProcessEvent(event)

    const point = pageToPixel([event.pageX, event.pageY])

    mouseMoveCallback(point)
  }

  const handleMouseLeave = (event: MouseEvent) => {
    setPreProcessEvent(event)

    mouseLeaveCallback()
  }

  const handleMouseUp = (event: MouseEvent) => {
    setPreProcessEvent(event)

    mouseUpCallback()
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    setPreProcessEvent(event)

    keyDownCallback(event)
  }

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseLeave,
    handleMouseUp,
    handleKeyDown,
  }
}

export default useAnnotationEvent
