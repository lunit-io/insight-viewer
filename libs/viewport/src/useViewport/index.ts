/**
 * @fileoverview Handles the Viewer's viewport.
 */
import { useState, useEffect, useCallback, useRef } from 'react'

import {
  cornerstoneHelper,
  BASE_VIEWPORT,
  DEFAULT_VIEWPORT_OPTIONS,
  DEFAULT_VIEWPORT_VIEWER_REF,
} from '@lunit/insight-viewer'

import type { Image, Viewport } from '@lunit/insight-viewer'
import type { SetViewportAction, UseViewportReturnType, UseViewportParams } from './type'

const { formatViewerViewport, getDefaultViewportForImage } = cornerstoneHelper

const getDefaultViewport = (image: Image | undefined, element: HTMLDivElement | null) => {
  if (!image || !element) return null

  const defaultViewport = getDefaultViewportForImage(element, image)

  return formatViewerViewport(defaultViewport)
}

const getViewportWithFitScaleOption = (
  viewport: Viewport,
  image: Image | undefined,
  element: HTMLDivElement | null
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
  { image, viewerRef, options = DEFAULT_VIEWPORT_OPTIONS, getInitialViewport }: UseViewportParams = {
    image: undefined,
    viewerRef: DEFAULT_VIEWPORT_VIEWER_REF,
    options: DEFAULT_VIEWPORT_OPTIONS,
  }
): UseViewportReturnType {
  const [viewport, setViewport] = useState<Viewport>({
    ...BASE_VIEWPORT,
    _viewportOptions: options,
  })

  const imageRef = useRef(image)
  const getInitialViewportRef = useRef(getInitialViewport)
  const imageSeriesKeyRef = useRef<string | undefined>()

  const resetViewport = useCallback(() => {
    const defaultViewport = getDefaultViewport(imageRef.current, viewerRef.current)

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
  }, [getInitialViewport, options, viewerRef])

  /**
   * We assigned the function type and the value type
   * for the immediate viewport assignment as union type
   * to utilize the previous viewport.
   */
  const setViewportWithValidation = useCallback(
    (setViewportAction: SetViewportAction) => {
      setViewport((prevViewport) => {
        const newViewport =
          typeof setViewportAction === 'function' ? setViewportAction(prevViewport) : setViewportAction

        const updatedViewport = getViewportWithFitScaleOption(newViewport, imageRef.current, viewerRef.current)

        return updatedViewport
      })
    },
    [viewerRef]
  )

  useEffect(() => {
    setViewportWithValidation((prevViewport) => ({ ...prevViewport, _viewportOptions: { fitScale: options.fitScale } }))
  }, [options.fitScale, setViewportWithValidation])

  useEffect(() => {
    imageRef.current = image
  }, [image])

  /**
   * The purpose of setting the initial Viewport value
   * when the image is changed
   */
  useEffect(() => {
    const defaultViewport = getDefaultViewport(imageRef.current, viewerRef.current)

    if (!defaultViewport) return

    // If multi frame, conditional statement to maintain with previous Viewport
    if (imageSeriesKeyRef.current && imageSeriesKeyRef.current === image?._imageSeriesKey) return

    const getInitialViewport = getInitialViewportRef.current

    const initialViewport = getInitialViewport ? getInitialViewport(defaultViewport) : defaultViewport

    /**
     * Set multi frame key
     * Since there is no single frame, assign undefined as it is
     */
    imageSeriesKeyRef.current = image?._imageSeriesKey

    setViewport((prevViewport) => ({
      ...prevViewport,
      ...initialViewport,
      _viewportOptions: prevViewport._viewportOptions,
    }))
  }, [image, viewerRef, getInitialViewportRef])

  return {
    viewport,
    setViewport: setViewportWithValidation,
    resetViewport,
    getDefaultViewport,
    initialized: viewport.scale !== BASE_VIEWPORT.scale, // BASE_VIEWPORT.scale is 0.
  }
}
