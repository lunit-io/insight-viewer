import { useEffect } from 'react'
import { fromEvent, Subscription } from 'rxjs'
import { map, filter, tap } from 'rxjs/operators'
import { ViewportInteraction, Interaction } from '../types'
import { Viewport } from '../../../types'
import { MOUSE_BUTTON, PRIMARY_CLICK, SECONDARY_CLICK } from '../const'
import { preventContextMenu, hasInteraction } from '../utils'
import { getViewport } from '../../../utils/cornerstoneHelper'
import { isValidViewport } from '../../../utils/common'

let subscription: Subscription

type ClickType = typeof PRIMARY_CLICK | typeof SECONDARY_CLICK

function hasClickType(
  clickType: ClickType | undefined,
  interaction: Interaction
) {
  return (
    (clickType === PRIMARY_CLICK || clickType === SECONDARY_CLICK) &&
    interaction[clickType] !== undefined
  )
}

function getCoord(element: Element, viewport?: Viewport) {
  if (viewport && isValidViewport(viewport)) {
    const { x, y } = viewport

    return {
      x,
      y,
    }
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

    const mousedown$ = fromEvent<MouseEvent>(
      <HTMLDivElement>element,
      'mousedown'
    )
    let clickType: ClickType | undefined
    if (!interaction) return undefined

    if (!hasInteraction(interaction, [PRIMARY_CLICK, SECONDARY_CLICK]))
      return undefined

    subscription = mousedown$
      .pipe(
        tap(({ button }) => {
          // tap operator for side effect
          if (button === MOUSE_BUTTON.primary) clickType = PRIMARY_CLICK
          if (button === MOUSE_BUTTON.secondary) clickType = SECONDARY_CLICK
        }),
        filter(() => hasClickType(clickType, interaction)),
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
