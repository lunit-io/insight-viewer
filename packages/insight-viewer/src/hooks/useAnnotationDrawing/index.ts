/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState, useEffect } from 'react'
import { UseAnnotationDrawingProps } from './types'
import { Contour, Point } from '../../types'
import { useOverlayContext } from '../../contexts'
import { checkFocusedCircle } from '../../utils/common/checkFocusedCircle'
import { checkFocusedContour } from '../../utils/common/checkFocusedContour'

const setPreProcessEvent = (event: MouseEvent | KeyboardEvent) => {
  event.preventDefault()
  event.stopPropagation()
  event.stopImmediatePropagation()
}

function useAnnotationDrawing<T extends Contour>({
  mode,
  annotations,
  svgElement,
  onAdd,
  onFocus,
  onRemove,
}: UseAnnotationDrawingProps<T>): Point[][] {
  const [annotation, setAnnotation] = useState<Point[]>([])
  const [isDrawingMode, setIsDrawingMode] = useState<boolean>(false)
  const [isOverlappedDrawing, setIsOverlappedDrawing] = useState<boolean>(false)
  const [focusedAnnotation, setFocusedAnnotation] = useState<T | null>(null)

  const { pageToPixel, enabledElement } = useOverlayContext()

  useEffect(() => {
    if (!svgElement || !enabledElement) return

    const handleMouseMoveToDraw = (event: MouseEvent) => {
      setPreProcessEvent(event)

      if (annotation.length > 0 && isDrawingMode) {
        const pixelPosition: Point = pageToPixel([event.pageX, event.pageY])

        if (focusedAnnotation) {
          setIsOverlappedDrawing(true)
        }

        setAnnotation(prevState => {
          if (mode === 'polygon' || mode === 'freeLine') {
            return [...prevState, pixelPosition]
          }

          if (mode === 'circle') {
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
      setIsOverlappedDrawing(false)
    }

    const handleMouseMoveToFindFocus = (event: MouseEvent) => {
      event.stopPropagation()

      if (annotations.length === 0) return

      const pixelPosition: Point = pageToPixel([event.pageX, event.pageY])
      const focusedAnnotationElement =
        mode === 'polygon' || mode === 'freeLine'
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

      enabledElement.element.addEventListener('mousemove', handleMouseMoveToFindFocus)
      enabledElement.element.addEventListener('mousedown', handleMouseDownToStartDraw)
      enabledElement.element.addEventListener('click', handleClickToRemove)
    }

    const deactivateInitialEvents = () => {
      if (!enabledElement || !enabledElement.element) return

      enabledElement.element.removeEventListener('mousemove', handleMouseMoveToFindFocus)
      enabledElement.element.removeEventListener('mousedown', handleMouseDownToStartDraw)
      enabledElement.element.removeEventListener('click', handleClickToRemove)
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
  }, [
    mode,
    annotations,
    svgElement,
    annotation,
    isDrawingMode,
    focusedAnnotation,
    enabledElement,
    isOverlappedDrawing,
    onAdd,
    onFocus,
    onRemove,
    pageToPixel,
  ])

  return [annotation]
}

export default useAnnotationDrawing
