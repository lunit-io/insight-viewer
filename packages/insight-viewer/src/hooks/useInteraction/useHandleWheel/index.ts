import { useEffect } from 'react'
import { fromEvent, Subscription } from 'rxjs'
import { filter, tap } from 'rxjs/operators'
import { ViewportInteraction } from '../types'

let subscription: Subscription

export default function useHandleWheel({
  element,
  interaction,
  onFrameChange,
}: ViewportInteraction): void {
  useEffect(() => {
    if (!element) return undefined
    const wheel$ = fromEvent<WheelEvent>(<HTMLDivElement>element, 'wheel')

    subscription = wheel$
      .pipe(
        filter(() => onFrameChange !== undefined),
        filter(({ deltaY }) => deltaY !== 0),
        tap(e => {
          e.preventDefault()
        })
      )
      .subscribe(({ deltaY }) => {
        if (onFrameChange) onFrameChange(prev => prev + (deltaY > 0 ? 1 : -1))
      })
    return () => {
      subscription.unsubscribe()
    }
  }, [interaction, element, onFrameChange])
}
