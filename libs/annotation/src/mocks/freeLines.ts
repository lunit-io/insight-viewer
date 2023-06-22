import type { FreeLineAnnotation } from '../types'

const INITIAL_FREE_LINE: FreeLineAnnotation = {
  id: 1,
  type: 'freeLine',
  points: [
    [1, 0],
    [1, 0],
  ],
  lineWidth: 1.5,
  labelPosition: [1, 0],
}

export { INITIAL_FREE_LINE }
