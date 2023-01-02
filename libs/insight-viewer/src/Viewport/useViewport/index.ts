/**
 * @fileoverview Handles the Viewer's viewport.
 */
import { useState, useEffect, useCallback, useRef } from 'react'

import { BASE_VIEWPORT, DEFAULT_VIEWPORT_OPTIONS } from '../../const'
import { formatViewerViewport } from '../../utils/common/formatViewport'
import { getDefaultViewportForImage } from '../../utils/cornerstoneHelper'

import type { Viewport } from '../../types'
import type { Image } from '../../Viewer/types'
import type { SetViewportAction, UseViewportReturnType, UseViewportParams } from './type'

const getDefaultViewport = (image: Image | undefined, element: HTMLDivElement | undefined) => {
  if (!image || !element) return null

  const defaultViewport = getDefaultViewportForImage(element, image)

  return formatViewerViewport(defaultViewport)
}

const getViewportWithFitScaleOption = (
  viewport: Viewport,
  image: Image | undefined,
  element: HTMLDivElement | undefined
): Viewport => {
  const defaultViewport = getDefaultViewport(image, element)

  if (!defaultViewport) return viewport

  const currentFitScaleOption = viewport._viewportOptions.fitScale

  if (currentFitScaleOption && viewport.scale < defaultViewport.scale) {
    return { ...viewport, scale: defaultViewport.scale }
  }

  return viewport
}

export function useViewport(
  { image, element, options = DEFAULT_VIEWPORT_OPTIONS, getInitialViewport }: UseViewportParams = {
    image: undefined,
    element: undefined,
    options: DEFAULT_VIEWPORT_OPTIONS,
  }
): UseViewportReturnType {
  const [viewport, setViewport] = useState<Viewport>({
    ...BASE_VIEWPORT,
    _viewportOptions: options,
  })

  const imageRef = useRef(image)
  const elementRef = useRef(element)
  const getInitialViewportRef = useRef(getInitialViewport)

  const resetViewport = useCallback(() => {
    const defaultViewport = getDefaultViewport(imageRef.current, elementRef.current)

    if (!defaultViewport) {
      setViewport({
        ...BASE_VIEWPORT,
        _viewportOptions: options,
      })

      return
    }

    /**
     * If the user has customized settings, reset using the custom settings
     * otherwise set to defaultViewport
     */
    if (getInitialViewport) {
      const initialViewport = getInitialViewport(defaultViewport)

      setViewport((prevViewport) => ({
        ...prevViewport,
        ...initialViewport,
        _viewportOptions: prevViewport._viewportOptions,
      }))
    } else {
      setViewport({ ...defaultViewport, _viewportOptions: options })
    }
  }, [getInitialViewport, options])

  /**
   * We assigned the function type and the value type
   * for the immediate viewport assignment as union type
   * to utilize the previous viewport.
   */
  const setViewportWithValidation = useCallback((setViewportAction: SetViewportAction) => {
    setViewport((prevViewport) => {
      const newViewport = typeof setViewportAction === 'function' ? setViewportAction(prevViewport) : setViewportAction

      const updatedViewport = getViewportWithFitScaleOption(newViewport, imageRef.current, elementRef.current)

      return updatedViewport
    })
  }, [])

  useEffect(() => {
    setViewportWithValidation((prevViewport) => ({ ...prevViewport, _viewportOptions: { fitScale: options.fitScale } }))
  }, [options.fitScale, setViewportWithValidation])

  useEffect(() => {
    imageRef.current = image
    elementRef.current = element
  }, [image, element])

  /**
   * The purpose of setting the initial Viewport value
   * when the image is changed
   */
  useEffect(() => {
    const defaultViewport = getDefaultViewport(imageRef.current, elementRef.current)

    if (!defaultViewport) return

    const getInitialViewport = getInitialViewportRef.current

    const initialViewport = getInitialViewport ? getInitialViewport(defaultViewport) : defaultViewport

    setViewport((prevViewport) => ({
      ...prevViewport,
      ...initialViewport,
      _viewportOptions: prevViewport._viewportOptions,
    }))
  }, [image, element, getInitialViewportRef])

  return {
    viewport,
    setViewport: setViewportWithValidation,
    resetViewport,
    getDefaultViewport,
    initialized: viewport.scale !== BASE_VIEWPORT.scale, // BASE_VIEWPORT.scale is 0.
  }
}
