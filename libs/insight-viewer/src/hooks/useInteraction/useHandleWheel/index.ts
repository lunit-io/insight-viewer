import { useEffect, useRef } from 'react'
import { fromEvent, filter, tap, Subscription } from 'rxjs'

import control from './control'
import { MOUSEWHEEL } from '../const'
import { setViewport, getViewport, formatCornerstoneViewport } from '../../../utils/cornerstoneHelper'

import type { Element, OnViewportChange } from '../../../types'
import type { CornerstoneViewport } from '../../../utils/cornerstoneHelper'
import type { Interaction, ViewportInteraction, WheelCoords, WheelAction } from '../types'
interface HandleViewportByWheelParams {
  element: Element
  interaction: Interaction
  wheelCoords: WheelCoords
  viewport: CornerstoneViewport
  onViewportChange?: OnViewportChange
}

function handleViewportByWheel({
  element,
  interaction,
  wheelCoords,
  viewport,
  onViewportChange,
}: HandleViewportByWheelParams): void {
  const wheelHandler = interaction[MOUSEWHEEL]

  function updateViewportByWheel(wheelEventType: WheelAction): void {
    if (!wheelEventType) return

    if (onViewportChange) {
      onViewportChange((prevViewport) => {
        const currentViewport = {
          ...prevViewport,
          ...control[wheelEventType](viewport, wheelCoords),
        }

        return currentViewport
      })
    } else {
      setViewport(
        <HTMLDivElement>element,
        formatCornerstoneViewport(viewport, control[wheelEventType](viewport, wheelCoords))
      )
    }
  }

  switch (typeof wheelHandler) {
    case 'string':
      updateViewportByWheel(wheelHandler)
      break
    case 'function':
      wheelHandler(wheelCoords.deltaX, wheelCoords.deltaY)
      break
    default:
      break
  }
}

export default function useHandleWheel({ image, element, interaction, onViewportChange }: ViewportInteraction): void {
  const subscriptionRef = useRef<Subscription>()

  useEffect(() => {
    if (!interaction || !element || !image) return undefined

    const wheel$ = fromEvent<WheelEvent>(<HTMLDivElement>element, 'wheel')

    subscriptionRef.current = wheel$
      .pipe(
        filter(({ deltaY }) => deltaY !== 0),
        tap((e) => {
          e.preventDefault()
        })
      )
      .subscribe(({ deltaX, deltaY }) => {
        const viewport = getViewport(<HTMLDivElement>element)

        if (!viewport) return

        handleViewportByWheel({
          element,
          interaction,
          wheelCoords: { deltaX, deltaY },
          viewport,
          onViewportChange,
        })
      })
    return () => {
      subscriptionRef?.current?.unsubscribe()
    }
  }, [interaction, element, image, onViewportChange])
}
