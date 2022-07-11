import { Dispatch, SetStateAction, CSSProperties, SVGProps } from 'react'
import { LOADING_STATE, LOADER_TYPE, IMAGE_LOADER_SCHEME } from '../const'

export type WithChildren<T = Record<string, unknown>> = T & {
  children?: React.ReactNode
}
export type Element = HTMLDivElement | null
export type ViewerError = Error & { status?: number }
export type OnError = (e: ViewerError) => void
export type ProgressComponent = ({ progress }: { progress: number }) => JSX.Element
export type RequestInterceptor = (request: Request) => void
export interface BasicViewport {
  scale: number
  invert: boolean
  hflip: boolean
  vflip: boolean
  rotation: number
  x: number
  y: number
  windowWidth: number
  windowCenter: number
}
export type Viewport = BasicViewport & {
  _initialViewport?: Partial<BasicViewport>
  _resetViewport?: Partial<BasicViewport>
}

export type Point = [number, number]
export type Contours = Point[][]

export interface HTTP {
  onError: OnError
  requestInterceptor: RequestInterceptor
}

export type OnViewportChange = Dispatch<SetStateAction<Viewport>>
export type LoadingState = typeof LOADING_STATE[keyof typeof LOADING_STATE]
export type LoaderType = typeof LOADER_TYPE[keyof typeof LOADER_TYPE]
export type ImageLoaderScheme = typeof IMAGE_LOADER_SCHEME[keyof typeof IMAGE_LOADER_SCHEME]
export type ImageId =
  | {
      [IMAGE_LOADER_SCHEME.WADO]: string | string[] | undefined
      [IMAGE_LOADER_SCHEME.DICOMFILE]?: never
      [IMAGE_LOADER_SCHEME.WEB]?: never
    }
  | {
      [IMAGE_LOADER_SCHEME.WADO]?: never
      [IMAGE_LOADER_SCHEME.DICOMFILE]: string | string[] | undefined
      [IMAGE_LOADER_SCHEME.WEB]?: never
    }
  | {
      [IMAGE_LOADER_SCHEME.WADO]?: never
      [IMAGE_LOADER_SCHEME.DICOMFILE]?: never
      [IMAGE_LOADER_SCHEME.WEB]: string | string[] | undefined
    }

export type EditMode = 'startPoint' | 'endPoint' | 'move' | 'textMove'

export type ViewerStyleType =
  | 'default'
  | 'select'
  | 'hover'
  | 'outline'
  | 'hoveredOutline'
  | 'selectedOutline'
  | 'highlight'
  | 'dashLine'
export type ViewerStyle = {
  [styleType in ViewerStyleType]?: CSSProperties
}

export type LineHeadMode = 'normal' | 'arrow'
export type AnnotationMode = 'line' | 'freeLine' | 'polygon' | 'circle' | 'text'

export interface AnnotationBase {
  /** Serves as id by contour */
  id: number

  type: AnnotationMode

  /** If label is present, it will output instead of id */
  label?: string

  /** polygon pabel position = [x, y] */
  labelPosition?: Point

  /**
   * The data-attribute is added to the svg element
   * You can implement functions such as css styling based on the attributes
   */
  dataAttrs?: { [attr: string]: string }

  lineWidth?: number
}

export interface LineAnnotation extends AnnotationBase {
  type: 'line'
  points: [Point, Point]

  headPoints?: Point[]
}

export interface FreeLineAnnotation extends AnnotationBase {
  type: 'freeLine'
  points: Point[]
}

export interface PolygonAnnotation extends AnnotationBase {
  type: 'polygon'
  points: Point[]
}

export interface CircleAnnotation extends AnnotationBase {
  type: 'circle'
  center: Point
  radius: number
}

export interface TextAnnotation extends AnnotationBase {
  type: 'text'
  points: [Point, Point]
  label: string
}

export type Annotation = PolygonAnnotation | FreeLineAnnotation | LineAnnotation | CircleAnnotation | TextAnnotation

export interface AnnotationViewerProps<T extends AnnotationBase> {
  annotation: T
  showOutline: boolean
  showAnnotationLabel: boolean
  hoveredAnnotation: Annotation | null
  annotationAttrs?: (annotation: Annotation, showOutline: boolean) => SVGProps<SVGPolygonElement>
}

export type MeasurementMode = 'ruler' | 'circle'
export interface MeasurementBase {
  id: number
  type: MeasurementMode
  lineWidth?: number
  dataAttrs?: { [attr: string]: string }
  textPoint: Point
  isEditingTextPoint: boolean
  connectingLine: [Point, Point]
}

export interface RulerMeasurement extends MeasurementBase {
  type: 'ruler'
  points: [Point, Point]
  length: number | null
}

export interface CircleMeasurement extends MeasurementBase {
  type: 'circle'
  center: Point
  radius: number
}

export interface DrawingRulerMeasurement extends RulerMeasurement {
  linePoints: string
  connectingPoints: string
}

export interface DrawingCircleMeasurement extends CircleMeasurement {
  drawingRadius: number
  connectingPoints: string
}

export type Measurement = RulerMeasurement | CircleMeasurement

export type DrawingMeasurement = DrawingRulerMeasurement | DrawingCircleMeasurement

export interface MeasurementViewerProps<T extends MeasurementBase> {
  measurement: T
  hoveredMeasurement: Measurement | null
}
