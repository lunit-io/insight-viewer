import { Dispatch, SetStateAction } from 'react'
import { LOADING_STATE, LOADER_TYPE, IMAGE_LOADER_SCHEME } from '../const'

export type WithChildren<T = Record<string, unknown>> = T & {
  children?: React.ReactNode
}
export type Element = HTMLDivElement | null
export type ViewerError = Error & { status?: number }
export type OnError = (e: ViewerError) => void
export type ProgressComponent = ({ progress }: { progress: number }) => JSX.Element
export type RequestInterceptor = (request: Request) => void

export type ViewportOptions = { fitScale: boolean }
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
  _viewportOptions: ViewportOptions
  /**
   * Flag variable to check whether to use legacy useViewport
   * Will be deleted after 6.3.0 version
   */
  isLegacyViewport?: true
}

export type Point = [x: number, y: number]

export interface HTTP {
  onError: OnError
  requestInterceptor: RequestInterceptor
}

export type Loader = (url: string) => Promise<ArrayBuffer>

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
