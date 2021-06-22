import { fromEvent, Subscription } from 'rxjs'
import { switchMap, map, takeUntil } from 'rxjs/operators'
import { Element } from '../../../types'
import { formatCornerstoneViewport } from '../../../utils/common/formatViewport'
import {
  getViewport,
  setViewport,
  CornerstoneViewport,
} from '../../../utils/cornerstoneHelper'
import { MouseDownMove } from '../types'
import control from './control'

let subscription: Subscription

export default function handleMouseDown(
  element: Element,
  eventType: MouseDownMove
): void {
  const mousedown$ = fromEvent<MouseEvent>(<HTMLDivElement>element, 'mousedown')
  const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove')
  const mouseup$ = fromEvent<MouseEvent>(document, 'mouseup')

  if (subscription) subscription.unsubscribe()
  if (eventType === undefined) {
    return undefined
  }

  subscription = mousedown$
    .pipe(
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
    .subscribe(delta => {
      const viewport = getViewport(
        <HTMLDivElement>element
      ) as CornerstoneViewport

      if (viewport)
        setViewport(
          <HTMLDivElement>element,
          formatCornerstoneViewport(
            viewport,
            control[eventType](viewport, delta)
          )
        )
    })
  return undefined
}
