import { fromEvent, Subscription } from 'rxjs'
import { filter, tap, switchMap, map, takeUntil } from 'rxjs/operators'
import { Element } from '../../../types'
import { formatCornerstoneViewport } from '../../../utils/common/formatViewport'
import {
  getViewport,
  setViewport,
  CornerstoneViewport,
} from '../../../utils/cornerstoneHelper'
import { Interaction, Drag } from '../types'
import { MOUSE_BUTTON, PRIMARY_DRAG, SECONDARY_DRAG } from '../const'
import control from './control'

let subscription: Subscription

type DragType = typeof PRIMARY_DRAG | typeof SECONDARY_DRAG

function hasDragType(value: unknown): value is DragType {
  return value === PRIMARY_DRAG || value === SECONDARY_DRAG
}

function preventContextMenu(e: Event) {
  e.preventDefault()
}

function hasInteraction(interaction: Interaction) {
  return interaction?.[PRIMARY_DRAG] || interaction?.[SECONDARY_DRAG]
}

function removeListener(element: Element) {
  element?.removeEventListener('contextmenu', preventContextMenu)
}

export default function handleDrag(
  element: Element,
  interaction: Interaction
): void {
  const mousedown$ = fromEvent<MouseEvent>(<HTMLDivElement>element, 'mousedown')
  const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove')
  const mouseup$ = fromEvent<MouseEvent>(document, 'mouseup')
  let dragType: DragType | undefined

  removeListener(element)
  if (subscription) subscription.unsubscribe()
  if (!hasInteraction(interaction)) return undefined

  subscription = mousedown$
    .pipe(
      tap(({ button }) => {
        if (button === MOUSE_BUTTON.primary) dragType = PRIMARY_DRAG
        if (button === MOUSE_BUTTON.secondary) dragType = SECONDARY_DRAG
      }),
      filter(() => hasDragType(dragType)),
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
              buttonType: start.button,
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

      if (viewport && hasDragType(dragType)) {
        const interactonType = interaction[dragType] as Drag
        setViewport(
          <HTMLDivElement>element,
          formatCornerstoneViewport(
            viewport,
            control[interactonType]?.(viewport, dragged)
          )
        )
      }
    })
  return undefined
}
