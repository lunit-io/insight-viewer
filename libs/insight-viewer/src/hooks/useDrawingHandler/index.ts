/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect } from 'react'
import { UseDrawingHandlerParams } from './types'
import { useOverlayContext } from '../../contexts'

const setPreProcessEvent = (event: MouseEvent | KeyboardEvent) => {
  event.preventDefault()
  event.stopPropagation()
  event.stopImmediatePropagation()
}

function useDrawingHandler({
  svgElement,
  setInitialPoint,
  addDrawingPoint,
  cancelDrawing,
  addDrewElement,
  hoveredDrawing,
}: UseDrawingHandlerParams): void {
  const { pageToPixel, enabledElement } = useOverlayContext()

  useEffect(() => {
    if (!svgElement || !enabledElement) return

    const handleMouseMove = (event: MouseEvent) => {
      // Apply Drawing only when left mouse button is pressed
      if (event.button !== 0) return

      setPreProcessEvent(event)

      const point = pageToPixel([event.pageX, event.pageY])

      addDrawingPoint(point)
    }

    const handleMouseUp = (event: MouseEvent) => {
      if (event.button !== 0) return

      setPreProcessEvent(event)

      addDrewElement()
      cancelDrawing()
    }

    const handleMouseLeave = (event: MouseEvent) => {
      setPreProcessEvent(event)
      deactivateMouseDrawEvents()

      addDrewElement()
      cancelDrawing()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        setPreProcessEvent(event)
        deactivateMouseDrawEvents()

        addDrewElement()
        cancelDrawing()
      }
    }

    const handleMouseDown = (event: MouseEvent) => {
      if (event.button !== 0) return

      activeMouseDrawEvents()

      const point = pageToPixel([event.pageX, event.pageY])

      setInitialPoint(point)
    }

    const activeMouseDrawEvents = () => {
      if (!enabledElement || !enabledElement.element) return
      if (hoveredDrawing !== null) return

      enabledElement.element.addEventListener('mouseup', handleMouseUp)
      enabledElement.element.addEventListener('mouseleave', handleMouseLeave)
      enabledElement.element.addEventListener('mouseover', activeMouseDrawEvents)
      enabledElement.element.addEventListener('mousedown', handleMouseDown)
      enabledElement.element.addEventListener('mousemove', handleMouseMove)

      window.addEventListener('keydown', handleKeyDown)
    }

    const deactivateMouseDrawEvents = () => {
      if (!enabledElement || !enabledElement.element) return

      enabledElement.element.removeEventListener('mousemove', handleMouseMove)
      enabledElement.element.removeEventListener('mouseup', handleMouseUp)
      enabledElement.element.removeEventListener('mouseleave', handleMouseLeave)
      enabledElement.element.removeEventListener('mousedown', handleMouseDown)

      window.removeEventListener('keydown', handleKeyDown)
    }

    const disableCheckMouseEvent = () => {
      enabledElement.element.removeEventListener('mouseover', activeMouseDrawEvents)
    }

    activeMouseDrawEvents()

    return () => {
      deactivateMouseDrawEvents()
      disableCheckMouseEvent()
    }
  }, [
    svgElement,
    enabledElement,
    pageToPixel,
    addDrawingPoint,
    addDrewElement,
    cancelDrawing,
    setInitialPoint,
    hoveredDrawing,
  ])
}

export default useDrawingHandler
