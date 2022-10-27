import { useEffect, useRef } from 'react'
import { fromEvent, filter, tap, Subscription } from 'rxjs'
import { ViewportInteraction } from '../types'

export default function useHandleWheel({ element, interaction }: ViewportInteraction): void {
  const subscriptionRef = useRef<Subscription>()

  useEffect(() => {
    if (!element) return undefined
    const wheel$ = fromEvent<WheelEvent>(<HTMLDivElement>element, 'wheel')

    subscriptionRef.current = wheel$
      .pipe(
        filter(({ deltaY }) => deltaY !== 0),
        tap((e) => {
          e.preventDefault()
        })
      )
      .subscribe(({ deltaX, deltaY }) => {
        if (interaction?.mouseWheel) interaction?.mouseWheel(deltaX, deltaY)
      })
    return () => {
      subscriptionRef?.current?.unsubscribe()
    }
  }, [interaction, element])
}
