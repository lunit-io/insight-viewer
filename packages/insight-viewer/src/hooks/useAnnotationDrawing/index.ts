/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState, useEffect } from 'react'
import { UseAnnotationDrawingProps } from './types'
import { Annotation, Point } from '../../types'
import { useOverlayContext } from '../../contexts'

const setPreProcessEvent = (event: MouseEvent | KeyboardEvent) => {
  event.preventDefault()
  event.stopPropagation()
  event.stopImmediatePropagation()
}

function useAnnotationDrawing<T extends Annotation>({
  mode,
  annotations,
  svgElement,
  onAdd,
}: UseAnnotationDrawingProps<T>): Point[][] {
  const [annotation, setAnnotation] = useState<Point[]>([])
  const [isDrawingMode, setIsDrawingMode] = useState<boolean>(false)

  const { pageToPixel, enabledElement } = useOverlayContext()

  useEffect(() => {
    if (!svgElement || !enabledElement) return

    const handleMouseMoveToDraw = (event: MouseEvent) => {
      setPreProcessEvent(event)

      if (annotation.length > 0 && isDrawingMode) {
        const pixelPosition: Point = pageToPixel([event.pageX, event.pageY])

        setAnnotation(prevState => {
          if (mode === 'polygon' || mode === 'freeLine') {
            return [...prevState, pixelPosition]
          }

          if (mode === 'circle' || mode === 'line') {
            return [prevState[0], pixelPosition]
          }

          return prevState
        })
      }
    }

    const handleMouseUpToEndDraw = (event: MouseEvent) => {
      setPreProcessEvent(event)
      deactivateMouseDrawEvents()
      activateInitialEvents()

      onAdd(annotation)
      setAnnotation([])
      setIsDrawingMode(false)
    }

    const handleMouseLeaveToCancelDraw = (event: MouseEvent) => {
      setPreProcessEvent(event)
      deactivateMouseDrawEvents()
      activateInitialEvents()

      setAnnotation([])
      setIsDrawingMode(false)
    }

    const handleKeyDownToCancelMouseDraw = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        setPreProcessEvent(event)
        deactivateMouseDrawEvents()
        activateInitialEvents()

        setAnnotation([])
        setIsDrawingMode(false)
      }
    }

    const handleMouseDownToStartDraw = (event: MouseEvent) => {
      setPreProcessEvent(event)
      deactivateInitialEvents()
      activeMouseDrawEvents()

      const pixelPosition: Point = pageToPixel([event.pageX, event.pageY])
      setAnnotation([pixelPosition])
      setIsDrawingMode(true)
    }

    const handleMouseMoveToFindFocus = (event: MouseEvent) => {
      event.stopPropagation()

      if (annotations.length === 0) return

      const pixelPosition: Point = pageToPixel([event.pageX, event.pageY])
      const focusedAnnotationElement =
        mode === 'polygon' || mode === 'freeLine' || mode === 'line'
          ? checkFocusedContour(annotations, pixelPosition)
          : checkFocusedCircle(annotations, pixelPosition)

      setFocusedAnnotation(focusedAnnotationElement)
      onFocus(focusedAnnotationElement)
    }

    const handleClickToRemove = (event: MouseEvent) => {
      event.stopPropagation()

      if (!focusedAnnotation || isOverlappedDrawing) {
        return
      }

      onRemove(focusedAnnotation)
    }

    const activateInitialEvents = () => {
      if (!enabledElement || !enabledElement.element) return

      enabledElement.element.addEventListener('mousedown', handleMouseDownToStartDraw)
    }

    const deactivateInitialEvents = () => {
      if (!enabledElement || !enabledElement.element) return

      enabledElement.element.removeEventListener('mousedown', handleMouseDownToStartDraw)
    }

    const activeMouseDrawEvents = () => {
      if (!enabledElement || !enabledElement.element) return

      enabledElement.element.addEventListener('mousemove', handleMouseMoveToDraw)
      enabledElement.element.addEventListener('mouseup', handleMouseUpToEndDraw)
      enabledElement.element.addEventListener('mouseleave', handleMouseLeaveToCancelDraw)
      window.addEventListener('keydown', handleKeyDownToCancelMouseDraw)
    }

    const deactivateMouseDrawEvents = () => {
      if (!enabledElement || !enabledElement.element) return

      enabledElement.element.removeEventListener('mousemove', handleMouseMoveToDraw)
      enabledElement.element.removeEventListener('mouseup', handleMouseUpToEndDraw)
      enabledElement.element.removeEventListener('mouseleave', handleMouseLeaveToCancelDraw)
      window.removeEventListener('keydown', handleKeyDownToCancelMouseDraw)
    }

    if (annotation.length > 0) {
      activeMouseDrawEvents()
    } else {
      activateInitialEvents()
    }

    // eslint-disable-next-line consistent-return
    return () => {
      deactivateInitialEvents()
      deactivateMouseDrawEvents()
    }
  }, [mode, annotations, svgElement, annotation, isDrawingMode, enabledElement, onAdd, pageToPixel])

  return [annotation]
}

export default useAnnotationDrawing
