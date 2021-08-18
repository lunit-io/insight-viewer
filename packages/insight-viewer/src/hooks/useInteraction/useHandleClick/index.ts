import { useEffect } from 'react'
import { fromEvent, Subscription } from 'rxjs'
import { map, filter, tap } from 'rxjs/operators'
import { ViewportInteraction } from '../types'
import { Viewport } from '../../../types'
import { MOUSE_BUTTON, PRIMARY_CLICK, SECONDARY_CLICK } from '../const'
import { preventContextMenu } from '../utils'
import { getViewport } from '../../../utils/cornerstoneHelper'

let subscription: Subscription
type ClickType = typeof PRIMARY_CLICK | typeof SECONDARY_CLICK

function getCoord(element: Element, viewport?: Viewport) {
  if (viewport) {
    const { x, y } = viewport
    return { x, y }
  }

  const { translation: { x = 0, y = 0 } = {} } =
    getViewport(<HTMLDivElement>element) ?? {}
  return { x, y }
}

export default function useHandleClick({
  element,
  interaction,
  viewport,
}: ViewportInteraction): void {
  useEffect(() => {
    if (!interaction || !element) return undefined
    // Restore context menu display.
    element?.removeEventListener('contextmenu', preventContextMenu)
    // No click interaction.
    if (!(interaction[PRIMARY_CLICK] || interaction[SECONDARY_CLICK]))
      return undefined

    const mousedown$ = fromEvent<MouseEvent>(
      <HTMLDivElement>element,
      'mousedown'
    )
    let clickType: ClickType | undefined
    if (!interaction) return undefined

    subscription = mousedown$
      .pipe(
        tap(({ button }) => {
          // tap operator for side effect
          if (button === MOUSE_BUTTON.primary) clickType = PRIMARY_CLICK
          if (button === MOUSE_BUTTON.secondary) clickType = SECONDARY_CLICK
        }),
        filter(() => clickType !== undefined),
        tap(({ button }) => {
          if (button === MOUSE_BUTTON.secondary) {
            element?.addEventListener('contextmenu', preventContextMenu)
          }
        }),
        map(({ clientX, clientY, currentTarget }) => ({
          clientX,
          clientY,
          currentTarget: <Element>currentTarget,
        }))
      )
      .subscribe(({ clientX, clientY, currentTarget }) => {
        const currentTargetRect = currentTarget.getBoundingClientRect()
        const { x, y } = getCoord(element, viewport)

        if (clickType)
          interaction[clickType]?.(
            -x + clientX - currentTargetRect.left,
            -y + clientY - currentTargetRect.top
          )
      })
    return () => {
      subscription.unsubscribe()
    }
  }, [element, interaction, viewport])

  return undefined
}
