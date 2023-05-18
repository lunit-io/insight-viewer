import type { EditMode } from '../types'

export const getCursorStatus = (editMode: EditMode | null) => {
  switch (editMode) {
    case 'startPoint':
    case 'endPoint':
      return 'editing'

    case 'move':
      return 'moving'

    default:
      return 'drawing'
  }
}
