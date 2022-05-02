/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState, useEffect } from 'react'
import { UseAnnotationDrawingProps } from './types'
import { Point } from '../../types'
import { useOverlayContext } from '../../contexts'
import { getDrewAnnotation } from '../../utils/common/getDrewAnnotation'

const setPreProcessEvent = (event: MouseEvent | KeyboardEvent) => {
  event.preventDefault()
  event.stopPropagation()
  event.stopImmediatePropagation()
}

function useAnnotationDrawing({
  mode,
  lineHead,
  annotations,
  svgElement,
  onAdd,
}: UseAnnotationDrawingProps): Point[][] {
  const [annotationPoints, setAnnotationPoints] = useState<Point[]>([])
  const [isDrawingMode, setIsDrawingMode] = useState<boolean>(false)

  const { pageToPixel, enabledElement, image } = useOverlayContext()

  useEffect(() => {
    if (!svgElement || !enabledElement) return

    const handleMouseMoveToDraw = (event: MouseEvent) => {
      setPreProcessEvent(event)

      if (annotationPoints.length > 0 && isDrawingMode) {
        const pixelPosition: Point = pageToPixel([event.pageX, event.pageY])

        setAnnotationPoints(prevState => {
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

      // TODO: Change conditional statement when adding Point function
      if (annotationPoints.length > 1) {
        const drewAnnotation = getDrewAnnotation(image, annotationPoints, mode, lineHead, annotations)

        onAdd(drewAnnotation)
      }

      setAnnotationPoints([])
      setIsDrawingMode(false)
    }

    const handleMouseLeaveToCancelDraw = (event: MouseEvent) => {
      setPreProcessEvent(event)
      deactivateMouseDrawEvents()
      activateInitialEvents()

      setAnnotationPoints([])
      setIsDrawingMode(false)
    }

    const handleKeyDownToCancelMouseDraw = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        setPreProcessEvent(event)
        deactivateMouseDrawEvents()
        activateInitialEvents()

        setAnnotationPoints([])
        setIsDrawingMode(false)
      }
    }

    const handleMouseDownToStartDraw = (event: MouseEvent) => {
      setPreProcessEvent(event)
      deactivateInitialEvents()
      activeMouseDrawEvents()

      const pixelPosition: Point = pageToPixel([event.pageX, event.pageY])
      setAnnotationPoints([pixelPosition])
      setIsDrawingMode(true)
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

    if (annotationPoints.length > 0) {
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
    lineHead,
    svgElement,
    annotationPoints,
    isDrawingMode,
    enabledElement,
    onAdd,
    pageToPixel,
    image,
  ])

  return [annotationPoints]
}

export default useAnnotationDrawing
