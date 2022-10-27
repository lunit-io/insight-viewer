import type { CursorStatus } from '../../types'
import type { EnabledElement } from '../cornerstoneHelper/types'

export const setClassName = (enabledElement: EnabledElement | null, cursorStatus: CursorStatus) => {
  if (!(enabledElement && enabledElement.element)) return

  enabledElement.element.classList.remove('drawing')
  enabledElement.element.classList.remove('moving')
  enabledElement.element.classList.remove('editing')

  if (cursorStatus === null) return

  enabledElement.element.classList.add(cursorStatus)
}
