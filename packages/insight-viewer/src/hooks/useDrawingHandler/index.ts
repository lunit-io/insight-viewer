/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect } from 'react'
import { UseDrawingHandlerProps } from './types'
import { useOverlayContext } from '../../contexts'

const setPreProcessEvent = (event: MouseEvent | KeyboardEvent) => {
  event.preventDefault()
  event.stopPropagation()
  event.stopImmediatePropagation()
}

function useDrawingHandler({
  svgElement,
  addStartPoint,
  addDrawingPoint,
  cancelDrawing,
  addDrewElement,
}: UseDrawingHandlerProps): void {
  const { pageToPixel, enabledElement } = useOverlayContext()

  useEffect(() => {
    if (!svgElement || !enabledElement) return

    const handleMouseMove = (event: MouseEvent) => {
      setPreProcessEvent(event)

      const point = pageToPixel([event.pageX, event.pageY])

      addDrawingPoint(point)
    }

    const handleMouseUp = (event: MouseEvent) => {
      setPreProcessEvent(event)
      deactivateMouseDrawEvents()

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
      activeMouseDrawEvents()

      const point = pageToPixel([event.pageX, event.pageY])

      addStartPoint(point)
    }

    const activeMouseDrawEvents = () => {
      if (!enabledElement || !enabledElement.element) return

      enabledElement.element.addEventListener('mousemove', handleMouseMove)
      enabledElement.element.addEventListener('mouseup', handleMouseUp)
      enabledElement.element.addEventListener('mouseleave', handleMouseLeave)
      enabledElement.element.addEventListener('mousedown', handleMouseDown)
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

    activeMouseDrawEvents()

    // eslint-disable-next-line consistent-return
    return () => {
      deactivateMouseDrawEvents()
    }
  }, [svgElement, enabledElement, pageToPixel, addDrawingPoint, addDrewElement, cancelDrawing, addStartPoint])
}

export default useDrawingHandler
