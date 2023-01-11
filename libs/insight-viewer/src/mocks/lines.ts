import type { LineAnnotation } from '../types'

const INITIAL_LINE: LineAnnotation = {
  id: 1,
  type: 'line',
  points: [
    [1, 0],
    [1, 0],
  ],
  lineWidth: 1.5,
  labelPosition: [-1, -5],
}

export { INITIAL_LINE }
