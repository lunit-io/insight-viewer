/**
 * @fileoverview Handles the Viewer's viewport.
 */
import { useState, useEffect, useCallback, useRef } from 'react'

import { BASE_VIEWPORT, DEFAULT_VIEWPORT_OPTIONS } from '../../const'
import { formatViewerViewport } from '../../utils/common/formatViewport'
import { getDefaultViewportForImage } from '../../utils/cornerstoneHelper'

import type { Viewport } from '../../types'
import type { SetViewportAction, UseRenewalViewportParams, UseRenewalViewportReturnType } from './type'

/**
 * @param initialViewport The user-defined initial viewport.
 * @returns {viewport} The viewport which is used as a Viewer's viewport prop.
 * @returns {setViewport} The viewport setter which is used as a Viewer's onViewportChange prop.
 * @returns {resetViewport} It resets a Viewer's viewport.
 * @returns {initialized} Whether the viewport is initialized or not.
 */
export function useRenewalViewport(
  { image, element, options = DEFAULT_VIEWPORT_OPTIONS, getInitialViewport }: UseRenewalViewportParams = {
    options: DEFAULT_VIEWPORT_OPTIONS,
  }
): UseRenewalViewportReturnType {
  const [viewport, setViewport] = useState<Viewport>({
    ...BASE_VIEWPORT,
    _viewportOptions: options,
  })

  const getInitialViewportRef = useRef(getInitialViewport)

  const getDefaultViewport = useCallback(() => {
    if (image && element) {
      const defaultViewport = getDefaultViewportForImage(element, image)

      return formatViewerViewport(defaultViewport)
    }

    return null
  }, [image, element])

  const getViewportWithFitScaleOption = useCallback(
    (viewport: Viewport, fitScale: boolean): Viewport => {
      const defaultViewport = getDefaultViewport()

      const ViewportOfUpdatingFitScaleOption = { ...viewport, _viewportOptions: { fitScale } }

      if (!defaultViewport) return ViewportOfUpdatingFitScaleOption

      if (fitScale && ViewportOfUpdatingFitScaleOption.scale < defaultViewport.scale) {
        return { ...ViewportOfUpdatingFitScaleOption, scale: defaultViewport.scale }
      }

      return ViewportOfUpdatingFitScaleOption
    },
    [getDefaultViewport]
  )

  const resetViewport = useCallback(() => {
    const defaultViewport = getDefaultViewport()

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
  }, [getDefaultViewport, getInitialViewport, options])

  /**
   * We assigned the function type and the value type
   * for the immediate viewport assignment as union type
   * to utilize the previous viewport.
   */
  const handleViewportChange = useCallback(
    (setViewportAction: SetViewportAction) => {
      setViewport((prevViewport) => {
        const newViewport =
          typeof setViewportAction === 'function' ? setViewportAction(prevViewport) : setViewportAction

        const updatedViewport = getViewportWithFitScaleOption(newViewport, options.fitScale)

        return updatedViewport
      })
    },
    [getViewportWithFitScaleOption, options.fitScale]
  )

  useEffect(() => {
    setViewport((prevViewport) => {
      const updatedViewport = getViewportWithFitScaleOption(prevViewport, options.fitScale)

      return updatedViewport
    })
  }, [options.fitScale, getViewportWithFitScaleOption])

  /**
   * The purpose of setting the initial Viewport value
   * when the image is changed
   */
  useEffect(() => {
    const defaultViewport = getDefaultViewport()

    if (!defaultViewport) return

    const getInitialViewport = getInitialViewportRef.current

    const initialViewport = getInitialViewport ? getInitialViewport(defaultViewport) : defaultViewport

    setViewport((prevViewport) => ({
      ...prevViewport,
      ...initialViewport,
      _viewportOptions: prevViewport._viewportOptions,
    }))
  }, [getInitialViewportRef, getDefaultViewport])

  return {
    viewport,
    setViewport: handleViewportChange,
    resetViewport,
    getDefaultViewport,
    initialized: viewport.scale !== BASE_VIEWPORT.scale, // BASE_VIEWPORT.scale is 0.
  }
}
