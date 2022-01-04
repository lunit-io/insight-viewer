import { CSSProperties } from 'react'
import { Contour, Point } from '../../types'

export interface SvgContourDrawerProps<T extends Contour> {
  width?: number
  height?: number

  contours: T[]

  /**
   * Whether the drawing function is enabled
   *
   * When inputting as HTMLElement, MouseEvent is handled using the HTMLElement
   */
  draw?: boolean | HTMLElement | null

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

  /** In the process of drawing, you can deactivate the animation expressed on the line */
  animateStroke?: boolean

  /** Access Device Settings */
  device?:
    | 'all'
    | 'mouse-only'
    | 'touch-only'
    | 'stylus-only'
    | 'mouse-and-stylus'
}
