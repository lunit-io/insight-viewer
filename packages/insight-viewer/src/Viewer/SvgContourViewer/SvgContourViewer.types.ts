import { CSSProperties, SVGProps } from 'react'
import { Contour, Point } from '../../types'

export interface SvgContoursDrawProps<T extends Contour> {
  contours: T[]
  isBorder: boolean
  focusedContour: T | null
  pixelToCanvas: (point: Point) => Point
  polygonAttrs?: (
    contour: Contour,
    isBorder: boolean
  ) => SVGProps<SVGPolygonElement>
}

export interface SvgContourViewerProps<T extends Contour> {
  width: number
  height: number

  /** Contour focused by user interaction such as mouse over */
  contours: T[]

  focusedContour: T | null

  /** <svg className={}> */
  className?: string

  /** <svg style={}> */
  style?: CSSProperties

  /**
   * You can set the attributes of individual polygon objects
   * If you set properties such as strokeWidth, the Style set in Styled Components is ignored
   * It is best not to use it as much as possible except in special cases
   */
  polygonAttrs?: (
    contour: Contour,
    isBorder: boolean
  ) => SVGProps<SVGPolygonElement>

  /**
   * Draw an outline on the line
   * Since the border is expressed by drawing two lines, it can be deactivated in a performance-sensitive situation
   */
  border?: boolean
}
