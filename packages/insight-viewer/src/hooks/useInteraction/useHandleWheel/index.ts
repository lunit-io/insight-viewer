import { useEffect, useRef } from 'react'
import { fromEvent, Subscription } from 'rxjs'
import { filter, tap } from 'rxjs/operators'
import { ViewportInteraction } from '../types'

export default function useHandleWheel({
  element,
  interaction,
  onViewportChange,
}: ViewportInteraction): void {
  const subscriptionRef = useRef<Subscription>()

  useEffect(() => {
    if (!element) return undefined
    const wheel$ = fromEvent<WheelEvent>(<HTMLDivElement>element, 'wheel')

    subscriptionRef.current = wheel$
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
      subscriptionRef?.current?.unsubscribe()
    }
  }, [interaction, element, onViewportChange])
}
