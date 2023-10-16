import type { Point } from '@lunit/insight-viewer'

export type { Point }
export type Unit = 'px' | 'mm'
export type EditMode = 'startPoint' | 'endPoint' | 'move' | 'textMove'
export type ClickAction = 'remove' | 'select'

export type AnnotationMode = 'line' | 'freeLine' | 'polygon' | 'text' | 'arrowLine' | 'ruler' | 'area' | 'point'
export type CursorStatus = 'drawing' | 'editing' | 'moving' | null

export type DataAttrs = {
  [key in `${'data'}-${string}`]: string
}

export interface AnnotationBase {
  /** Serves as id by contour */
  id: number

  type: AnnotationMode

  /** If label is present, it will output instead of id */
  label?: string

  /** polygon label position = [x, y] */
  labelPosition?: Point

  /**
   * The data-attribute is added to the svg element
   * You can implement functions such as css styling based on the attributes
   */
  dataAttrs?: DataAttrs

  lineWidth?: number
}

export interface MeasurableAnnotationBase extends AnnotationBase {
  unit: Unit
  measuredValue: number
  textPoint: Point | null
}

export interface LineAnnotation extends AnnotationBase {
  type: 'line'
  points: [Point, Point]
  /** @deprecated use arrow line instead */
  hasArrowHead?: boolean
}

export interface ArrowLineAnnotation extends AnnotationBase {
  type: 'arrowLine'
  points: [Point, Point]
}

export interface FreeLineAnnotation extends AnnotationBase {
  type: 'freeLine'
  points: Point[]
}

export interface PolygonAnnotation extends AnnotationBase {
  type: 'polygon'
  points: Point[]
}

export interface TextAnnotation extends AnnotationBase {
  type: 'text'
  points: [Point, Point]
  label: string
}

export interface PointAnnotation extends AnnotationBase {
  type: 'point'
  point: Point
}

export interface RulerAnnotation extends MeasurableAnnotationBase {
  type: 'ruler'
  startAndEndPoint: [startPoint: Point, endPoint: Point]
}

export interface AreaAnnotation extends MeasurableAnnotationBase {
  type: 'area'
  radius: number
  centerPoint: Point
}

export type Annotation =
  | PolygonAnnotation
  | FreeLineAnnotation
  | LineAnnotation
  | TextAnnotation
  | ArrowLineAnnotation
  | PointAnnotation
  | RulerAnnotation
  | AreaAnnotation

export type AnnotationSplitter<T> = T extends 'text'
  ? TextAnnotation
  : T extends 'freeLine'
  ? FreeLineAnnotation
  : T extends 'line'
  ? LineAnnotation
  : T extends 'polygon'
  ? PolygonAnnotation
  : T extends 'arrowLine'
  ? ArrowLineAnnotation
  : T extends 'point'
  ? PointAnnotation
  : T extends 'ruler'
  ? RulerAnnotation
  : T extends 'area'
  ? AreaAnnotation
  : never

interface DrawableCommonAttribute {
  canvasLabelPosition: Point | null
  cursorClassName: 'pointer' | ''
}

type DrawableAnnotationBase<T> = AnnotationSplitter<T> & DrawableCommonAttribute

export interface DrawablePolygonAnnotation extends DrawableAnnotationBase<'polygon'> {
  drawingPoints: Point[]
  drawingPointsToString: string
}

export interface DrawableLineAnnotation extends DrawableAnnotationBase<'line'> {
  drawingPoints: [Point, Point]
  drawingPointsToString: string
}

export interface DrawableFreeLineAnnotation extends DrawableAnnotationBase<'freeLine'> {
  drawingPoints: Point[]
  drawingPointsToString: string
}

export interface DrawableArrowLineAnnotation extends DrawableAnnotationBase<'arrowLine'> {
  drawingPoints: [Point, Point]
  drawingPointsToString: string
  canvasArrowHeadPoints: string
}

export interface DrawableTextAnnotation extends DrawableAnnotationBase<'text'> {
  drawingPoints: [Point, Point]
  dimensions: [number, number]
}

export interface DrawablePointAnnotation extends DrawableAnnotationBase<'point'> {
  drawingPoint: Point
  drawingPointsToString: string
}

export interface DrawableRulerAnnotation extends DrawableAnnotationBase<'ruler'> {
  drawingPoints: [Point, Point]
  drawingPointsToString: string
  formattedValue: string
}

export interface DrawableAreaAnnotation extends DrawableAnnotationBase<'area'> {
  drawingCenter: Point
  drawingRadius: number
  formattedValue: string
}

export type DrawableAnnotation =
  | DrawablePolygonAnnotation
  | DrawableLineAnnotation
  | DrawableArrowLineAnnotation
  | DrawableFreeLineAnnotation
  | DrawableTextAnnotation
  | DrawablePointAnnotation
  | DrawableRulerAnnotation
  | DrawableAreaAnnotation
