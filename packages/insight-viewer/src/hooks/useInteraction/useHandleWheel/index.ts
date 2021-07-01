import { useEffect } from 'react'
import { fromEvent, Subscription } from 'rxjs'
import { filter, tap } from 'rxjs/operators'
import { ViewportInteraction } from '../types'

let subscription: Subscription

export default function useHandleWheel({
  element,
  interaction,
  onViewportChange,
}: ViewportInteraction): void {
  useEffect(() => {
    if (!element) return undefined
    const wheel$ = fromEvent<WheelEvent>(<HTMLDivElement>element, 'wheel')

    subscription = wheel$
      .pipe(
        filter(({ deltaY }) => deltaY !== 0),
        tap(e => {
          e.preventDefault()
        })
      )
      .subscribe(({ deltaX, deltaY }) => {
        if (interaction?.mouseWheel) interaction?.mouseWheel(deltaX, deltaY)
      })
    return () => {
      subscription.unsubscribe()
    }
  }, [interaction, element, onViewportChange])
}
