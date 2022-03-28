/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState, useEffect } from 'react'
import { UseMeasurementDrawingProps } from './types'
import { Point } from '../../types'
import { useOverlayContext } from '../../contexts'
import { getDrewMeasurement } from '../../utils/common/getDrewMeasurement'

const setPreProcessEvent = (event: MouseEvent | KeyboardEvent) => {
  event.preventDefault()
  event.stopPropagation()
  event.stopImmediatePropagation()
}

function useMeasurementDrawing({ mode, measurements, svgElement, onAdd }: UseMeasurementDrawingProps): Point[][] {
  const [measurementPoints, setMeasurementPoints] = useState<Point[]>([])
  const [isDrawingMode, setIsDrawingMode] = useState<boolean>(false)

  const { pageToPixel, enabledElement, image } = useOverlayContext()

  useEffect(() => {
    if (!svgElement || !enabledElement) return

    const handleMouseMoveToDraw = (event: MouseEvent) => {
      setPreProcessEvent(event)

      if (measurementPoints.length > 0 && isDrawingMode) {
        const pixelPosition: Point = pageToPixel([event.pageX, event.pageY])

        setMeasurementPoints(prevState => {
          if (mode === 'circle' || mode === 'ruler') {
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

      if (measurementPoints.length > 1) {
        const drewMeasurement = getDrewMeasurement(measurementPoints, mode, measurements, image)

        onAdd(drewMeasurement)
      }

      setMeasurementPoints([])
      setIsDrawingMode(false)
    }

    const handleMouseLeaveToCancelDraw = (event: MouseEvent) => {
      setPreProcessEvent(event)
      deactivateMouseDrawEvents()
      activateInitialEvents()

      setMeasurementPoints([])
      setIsDrawingMode(false)
    }

    const handleKeyDownToCancelMouseDraw = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        setPreProcessEvent(event)
        deactivateMouseDrawEvents()
        activateInitialEvents()

        setMeasurementPoints([])
        setIsDrawingMode(false)
      }
    }

    const handleMouseDownToStartDraw = (event: MouseEvent) => {
      setPreProcessEvent(event)
      deactivateInitialEvents()
      activeMouseDrawEvents()

      const pixelPosition: Point = pageToPixel([event.pageX, event.pageY])
      setMeasurementPoints([pixelPosition])
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

    if (measurementPoints.length > 0) {
      activeMouseDrawEvents()
    } else {
      activateInitialEvents()
    }

    // eslint-disable-next-line consistent-return
    return () => {
      deactivateInitialEvents()
      deactivateMouseDrawEvents()
    }
  }, [mode, measurements, svgElement, image, measurementPoints, isDrawingMode, enabledElement, onAdd, pageToPixel])

  return [measurementPoints]
}

export default useMeasurementDrawing
