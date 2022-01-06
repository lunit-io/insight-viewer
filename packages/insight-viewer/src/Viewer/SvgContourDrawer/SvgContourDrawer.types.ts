import { CSSProperties } from 'react'
import { Contour, Point } from '../../types'

export interface SvgContourDrawerProps<T extends Contour> {
  width?: number
  height?: number

  contours: T[]

  /**
   * When Mouse Over on a Contour
   * Required to determine focusedContour
   */
  onFocus: (contour: T | null) => void

  /** When drawing is complete and a new contour occurs */
  onAdd: (polygon: Point[]) => void

  /** Needed to delete a specific contour by clicking on it */
  onRemove: (contour: T) => void

  className?: string
  style?: CSSProperties

  /** Access Device Settings */
  device?:
    | 'all'
    | 'mouse-only'
    | 'touch-only'
    | 'stylus-only'
    | 'mouse-and-stylus'
}
