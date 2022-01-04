/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState, useEffect } from 'react'
import { UseSvgContourDrawingProps } from './types'
import { Contour, Point } from '../../types'
import { useOverlayContext } from '../../contexts'
import { checkFocusedContour } from '../../utils/common/checkFocusedContour'

const setPreProcessEvent = (event: MouseEvent | KeyboardEvent) => {
  event.preventDefault()
  event.stopPropagation()
  event.stopImmediatePropagation()
}

function useSvgContourDrawing<T extends Contour>({
  svgElement,
  contours,
  onAdd,
  onFocus,
  onRemove,
}: UseSvgContourDrawingProps<T>): Point[][] {
  const [polygon, setPolygon] = useState<Point[]>([])
  const [focusedContour, setFocusedContour] = useState<T | null>(null)
  const [isDrawingMode, setIsDrawingMode] = useState<boolean>(false)

  const { pageToPixel, enabledElement } = useOverlayContext()

  useEffect(() => {
    if (!svgElement || !enabledElement) return

    const handleMouseMoveToDraw = (event: MouseEvent) => {
      setPreProcessEvent(event)

      if (polygon.length > 0 && isDrawingMode) {
        const pixelPosition: Point = pageToPixel([event.pageX, event.pageY])

        setPolygon(prevState => [...prevState, pixelPosition])
      }
    }

    const handleMouseUpToEndDraw = (event: MouseEvent) => {
      setPreProcessEvent(event)
      deactiveMouseDrawEvents()
      activateInitialEvents()

      onAdd(polygon)
      setPolygon([])
      setIsDrawingMode(false)
    }

    const handleMouseLeaveToCancelDraw = (event: MouseEvent) => {
      setPreProcessEvent(event)
      deactiveMouseDrawEvents()
      activateInitialEvents()

      setPolygon([])
      setIsDrawingMode(false)
    }

    const handleKeyDownToCancelMouseDraw = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        setPreProcessEvent(event)
        deactiveMouseDrawEvents()
        activateInitialEvents()

        setPolygon([])
        setIsDrawingMode(false)
      }
    }

    const handleMouseDownToStartDraw = (event: MouseEvent) => {
      setPreProcessEvent(event)
      deactivateInitialEvents()
      activeMouseDrawEvents()

      const pixelPosition: Point = pageToPixel([event.pageX, event.pageY])
      setPolygon([pixelPosition])
      setIsDrawingMode(true)
    }

    const handleMouseMoveToFindFocus = (event: MouseEvent) => {
      event.stopPropagation()

      if (contours.length === 0) return

      const pixelPosition: Point = pageToPixel([event.pageX, event.pageY])
      const focusedContourElement = checkFocusedContour(contours, pixelPosition)

      setFocusedContour(focusedContourElement)
      onFocus(focusedContourElement)
    }

    const handleClickToRemove = (event: MouseEvent) => {
      event.stopPropagation()

      if (!focusedContour || isDrawingMode) return
      onRemove(focusedContour)
    }

    const activateInitialEvents = () => {
      if (!enabledElement || !enabledElement.element) return

      enabledElement.element.addEventListener(
        'mousemove',
        handleMouseMoveToFindFocus
      )
      enabledElement.element.addEventListener(
        'mousedown',
        handleMouseDownToStartDraw
      )
      enabledElement.element.addEventListener('click', handleClickToRemove)
    }

    const deactivateInitialEvents = () => {
      if (!enabledElement || !enabledElement.element) return

      enabledElement.element.removeEventListener(
        'mousemove',
        handleMouseMoveToFindFocus
      )
      enabledElement.element.removeEventListener(
        'mousedown',
        handleMouseDownToStartDraw
      )
      enabledElement.element.removeEventListener('click', handleClickToRemove)
    }

    const activeMouseDrawEvents = () => {
      if (!enabledElement || !enabledElement.element) return

      enabledElement.element.addEventListener(
        'mousemove',
        handleMouseMoveToDraw
      )
      enabledElement.element.addEventListener('mouseup', handleMouseUpToEndDraw)
      enabledElement.element.addEventListener(
        'mouseleave',
        handleMouseLeaveToCancelDraw
      )
      window.addEventListener('keydown', handleKeyDownToCancelMouseDraw)
    }

    const deactiveMouseDrawEvents = () => {
      if (!enabledElement || !enabledElement.element) return

      enabledElement.element.removeEventListener(
        'mousemove',
        handleMouseMoveToDraw
      )
      enabledElement.element.removeEventListener(
        'mouseup',
        handleMouseUpToEndDraw
      )
      enabledElement.element.removeEventListener(
        'mouseleave',
        handleMouseLeaveToCancelDraw
      )
      window.removeEventListener('keydown', handleKeyDownToCancelMouseDraw)
    }

    if (polygon.length > 0) {
      activeMouseDrawEvents()
    } else {
      activateInitialEvents()
    }

    // eslint-disable-next-line consistent-return
    return () => {
      deactivateInitialEvents()
      deactiveMouseDrawEvents()
    }
  }, [
    contours,
    svgElement,
    polygon,
    isDrawingMode,
    focusedContour,
    enabledElement,
    onAdd,
    onFocus,
    onRemove,
    pageToPixel,
  ])

  return [polygon]
}

export default useSvgContourDrawing
