import { VIEWER_TYPE } from '../const'

export type WithChildren<T = Record<string, unknown>> = T & {
  children?: React.ReactNode
}

export type ViewerType = typeof VIEWER_TYPE[keyof typeof VIEWER_TYPE]
export type OnError = (e: Error) => void
export type Progress = ({ progress }: { progress: number }) => JSX.Element
export type Viewer = ({ imageId }: { imageId: string }) => JSX.Element
export type SetHeader = (request: Request) => void
