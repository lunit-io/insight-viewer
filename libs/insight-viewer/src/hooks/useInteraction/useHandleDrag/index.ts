import { useEffect, useRef } from 'react'
import { fromEvent, tap, switchMap, map, takeUntil, filter, Subscription, merge } from 'rxjs'
import { Element, OnViewportChange } from '../../../types'
import { formatCornerstoneViewport } from '../../../utils/cornerstoneHelper/formatViewport'
import {
  getViewport,
  setViewport,
  CornerstoneViewport,
  CornerstoneImage,
  getDefaultViewportForImage,
} from '../../../utils/cornerstoneHelper'
import { DragCoords, Interaction, DragAction, ViewportInteraction } from '../types'
import { MOUSE_BUTTON, PRIMARY_DRAG, SECONDARY_DRAG } from '../const'
import { preventContextMenu } from '../utils'
import control from './control'

type DragType = typeof PRIMARY_DRAG | typeof SECONDARY_DRAG

/**
 * If interaction[dragType] is a pre-defined drag action('pan' | 'adjust'),
 *  update the viewport with it.
 * If interaction[dragType] is a callback, viewport and delta are passed to the callback,
 *  so the consumers update the viewport by themselves.
 * @param element The HTML Element enabled for Cornerstone.
 * @param interaction The Viewer's interaction prop. { primaryDrag, secondaryDrag ... }
 * @param dragType 'primaryDrag' | 'secondaryDrag'
 * @param dragged The dragged x, y coordinates.
 * @param viewport The Viewer's viewport prop.
 * @param onViewportChange The Viewer's viewport setter prop.
 */
function handleViewportByDrag({
  image,
  element,
  interaction,
  dragType,
  dragged,
  viewport,
  onViewportChange,
}: {
  image: CornerstoneImage
  interaction: Interaction
  dragType: DragType
  element: Element
  viewport: CornerstoneViewport
  dragged: DragCoords
  onViewportChange?: OnViewportChange
}): void {
  const dragHandler = interaction[dragType]

  /**
   * If a drag handler is pre-defined, call the drag control function provided by default.
   * It results in the Viewer's viewport update.
   */
  function updateViewportByDrag(dragEventType?: DragAction): void {
    if (!dragEventType) return

    const defaultViewport = getDefaultViewportForImage(<HTMLDivElement>element, image)

    // If there is a viewport setter, set a new viewport which is triggered by interaction.
    if (onViewportChange) {
      onViewportChange((prev) => {
        const currentViewport = {
          ...prev,
          ...control[dragEventType]?.(viewport, dragged),
        }

        if (
          dragEventType === 'zoom' &&
          prev._viewportOptions.fitScale &&
          currentViewport.scale <= defaultViewport.scale
        ) {
          return prev
        }

        return {
          ...prev,
          ...control[dragEventType]?.(viewport, dragged),
        }
      })
    } else {
      // If no viewport setter, just update cornerstone viewport.
      setViewport(
        <HTMLDivElement>element,
        formatCornerstoneViewport(viewport, control[dragEventType]?.(viewport, dragged))
      )
    }
  }

  switch (typeof dragHandler) {
    case 'string':
      updateViewportByDrag(dragHandler)
      break
    case 'function':
      dragHandler({
        viewport,
        delta: {
          x: dragged.deltaX,
          y: dragged.deltaY,
        },
      })
      break
    default:
      break
  }
}

export default function useHandleDrag({ image, element, interaction, onViewportChange }: ViewportInteraction): void {
  const subscriptionRef = useRef<Subscription>()

  useEffect(() => {
    if (!interaction || !element || !image) return undefined
    // Restore context menu display.
    element?.removeEventListener('contextmenu', preventContextMenu)
    // No drag interaction.
    if (!(interaction[PRIMARY_DRAG] || interaction[SECONDARY_DRAG])) return undefined

    const mousedown$ = fromEvent<MouseEvent>(<HTMLDivElement>element, 'mousedown')
    const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove')
    const mouseup$ = fromEvent<MouseEvent>(document, 'mouseup')
    const mouseleave$ = fromEvent<MouseEvent>(document, 'mouseleave')
    let dragType: DragType | undefined

    subscriptionRef.current = mousedown$
      .pipe(
        tap(({ button }) => {
          // tap operator for side effect
          if (button === MOUSE_BUTTON.primary) dragType = PRIMARY_DRAG
          if (button === MOUSE_BUTTON.secondary) dragType = SECONDARY_DRAG
        }),
        filter(() => dragType !== undefined),
        tap(({ button }) => {
          if (button === MOUSE_BUTTON.secondary) {
            element?.addEventListener('contextmenu', preventContextMenu)
          }
        }),
        switchMap((start) => {
          start.stopPropagation()
          let lastX = start.pageX
          let lastY = start.pageY
          const { top, left, width, height } = element.getBoundingClientRect()
          /** relative x position from center of the viewer */
          const startX = start.pageX - (left + width / 2)
          /** relative y position from center of the viewer */
          const startY = start.pageY - (top + height / 2)
          return mousemove$.pipe(
            map((move: MouseEvent) => {
              move.preventDefault()
              const deltaX = move.pageX - lastX
              const deltaY = move.pageY - lastY
              lastX = move.pageX
              lastY = move.pageY

              return {
                startX,
                startY,
                deltaX,
                deltaY,
              }
            }),
            takeUntil(merge(mouseup$, mouseleave$))
          )
        })
      )
      .subscribe((dragged) => {
        const viewport = getViewport(<HTMLDivElement>element)
        if (!viewport || !dragType) return

        handleViewportByDrag({
          image,
          interaction,
          dragType,
          element,
          viewport,
          dragged,
          onViewportChange,
        })
      })

    return () => {
      subscriptionRef?.current?.unsubscribe()
    }
  }, [image, element, interaction, onViewportChange])
}
