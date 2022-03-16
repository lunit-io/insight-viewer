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

export type AnnotationMode = 'line' | 'freeLine' | 'arrowLine' | 'polygon' | 'circle'

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
}

export interface FreeLineAnnotation extends AnnotationBase {
  type: 'freeLine'
  points: Point[]
}

export interface ArrowLineAnnotation extends AnnotationBase {
  type: 'arrowLine'
  points: [Point, Point]
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

export type Annotation =
  | PolygonAnnotation
  | ArrowLineAnnotation
  | FreeLineAnnotation
  | LineAnnotation
  | CircleAnnotation

export type AnnotationStyleType = 'default' | 'select' | 'outline' | 'highlight'
export type AnnotationStyle = {
  [styleType in AnnotationStyleType]?: CSSProperties
}

export interface AnnotationViewerProps<T extends AnnotationBase> {
  annotation: T
  showOutline: boolean
  showAnnotationLabel?: boolean
  selectedAnnotation: Annotation | null
  annotationAttrs?: (annotation: Annotation, showOutline: boolean) => SVGProps<SVGPolygonElement>
  pixelToCanvas: (point: Point) => Point
}

export type HeadType = 'normal' | 'arrow'
