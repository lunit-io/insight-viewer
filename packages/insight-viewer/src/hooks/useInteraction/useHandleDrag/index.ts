import { useEffect } from 'react'
import { fromEvent, Subscription } from 'rxjs'
import { tap, switchMap, map, takeUntil } from 'rxjs/operators'
import { Viewport } from 'cornerstone-core'
import { Element, OnViewportChange } from '../../../types'
import { formatCornerstoneViewport } from '../../../utils/common/formatViewport'
import {
  getViewport,
  setViewport,
  CornerstoneViewport,
} from '../../../utils/cornerstoneHelper'
import {
  Interaction,
  Pan,
  Adjust,
  DragEvent,
  ViewportInteraction,
} from '../types'
import { MOUSE_BUTTON, PRIMARY_DRAG, SECONDARY_DRAG } from '../const'
import { preventContextMenu, hasInteraction } from '../utils'
import control from './control'

let subscription: Subscription

type DragType = typeof PRIMARY_DRAG | typeof SECONDARY_DRAG

function hasDragType(value: unknown): value is DragType {
  return value === PRIMARY_DRAG || value === SECONDARY_DRAG
}

function handleInteraction({
  interaction,
  dragType,
  element,
  viewport,
  dragged,
  onViewportChange,
}: {
  interaction: Interaction
  dragType: DragType
  element: Element
  viewport: Viewport
  dragged: {
    x: number
    y: number
  }
  onViewportChange?: OnViewportChange
}): void {
  const handler = interaction[dragType]

  function updateViewport(eventType?: DragEvent): void {
    if (!eventType) return

    if (onViewportChange) {
      onViewportChange(prev => ({
        ...prev,
        ...(control[eventType] as Pan | Adjust)?.(viewport, dragged),
      }))
    } else {
      setViewport(
        <HTMLDivElement>element,
        formatCornerstoneViewport(
          viewport,
          (control[eventType] as Pan | Adjust)?.(viewport, dragged)
        )
      )
    }
  }

  switch (typeof handler) {
    case 'string':
      updateViewport(handler)
      break
    case 'function':
      handler({ viewport, delta: dragged, updateViewport })
      break
    default:
      break
  }
}

export default function useHandleDrag({
  element,
  interaction,
  onViewportChange,
}: ViewportInteraction): void {
  useEffect(() => {
    if (!interaction || !element) return undefined

    const mousedown$ = fromEvent<MouseEvent>(
      <HTMLDivElement>element,
      'mousedown'
    )
    const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove')
    const mouseup$ = fromEvent<MouseEvent>(document, 'mouseup')
    let dragType: DragType | undefined

    element?.removeEventListener('contextmenu', preventContextMenu)
    if (subscription) subscription.unsubscribe()
    if (!hasInteraction(interaction, [PRIMARY_DRAG, SECONDARY_DRAG]))
      return undefined

    subscription = mousedown$
      .pipe(
        tap(({ button }) => {
          // tap operator for side effect
          if (button === MOUSE_BUTTON.primary) dragType = PRIMARY_DRAG
          if (button === MOUSE_BUTTON.secondary) dragType = SECONDARY_DRAG
        }),
        tap(({ button }) => {
          if (
            button === MOUSE_BUTTON.secondary &&
            interaction[dragType as DragType]
          ) {
            element?.addEventListener('contextmenu', preventContextMenu)
          }
        }),
        switchMap(start => {
          let lastX = start.pageX
          let lastY = start.pageY
          return mousemove$.pipe(
            map((move: MouseEvent) => {
              move.preventDefault()
              const deltaX = move.pageX - lastX
              const deltaY = move.pageY - lastY
              lastX = move.pageX
              lastY = move.pageY

              return {
                x: deltaX,
                y: deltaY,
              }
            }),
            takeUntil(mouseup$)
          )
        })
      )
      .subscribe(dragged => {
        const viewport = getViewport(
          <HTMLDivElement>element
        ) as CornerstoneViewport

        if (viewport && hasDragType(dragType) && interaction[dragType]) {
          handleInteraction({
            interaction,
            dragType,
            element,
            viewport,
            dragged,
            onViewportChange,
          })
        }
      })

    return undefined
  }, [element, interaction, onViewportChange])
}
