import { CSSProperties, SVGProps } from 'react'
import { Annotation, Point, AnnotationMode } from '../../types'

export interface AnnotationViewerProps<T extends Annotation> {
  width?: number
  height?: number

  /** Annotation focused by user interaction such as mouse over */
  annotations: T[]

  focusedAnnotation: T | null

  /** <svg className={}> */
  className?: string

  /** <svg style={}> */
  style?: CSSProperties

  /**
   * You can set the attributes of individual annotation objects
   * If you set properties such as strokeWidth, the Style set in Styled Components is ignored
   * It is best not to use it as much as possible except in special cases
   */
  annotationAttrs?: (annotation: Annotation, showOutline: boolean) => SVGProps<SVGPolygonElement>

  /**
   * Draw an outline on the line
   * Since the outline is expressed by drawing two lines, it can be deactivated in a performance-sensitive situation
   */
  showOutline?: boolean

  /**
   * annotation label notation flag variable
   * Default value is false
   */
  showAnnotationLabel?: boolean

  mode?: AnnotationMode
}

export interface AnnotationsDrawProps<T extends Annotation> extends Omit<AnnotationViewerProps<T>, 'width' | 'height'> {
  mode: AnnotationMode
  showOutline: boolean
  pixelToCanvas: (point: Point) => Point
}
