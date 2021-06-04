import { VIEWER_TYPE } from '../const'

export type WithChildren<T = Record<string, unknown>> = T & {
  children?: React.ReactNode
}
export type Element = HTMLDivElement | null
export type ViewerType = typeof VIEWER_TYPE[keyof typeof VIEWER_TYPE]
export type ViewerError = Error & { status?: number }
export type OnError = (e: ViewerError) => void
export type Progress = ({ progress }: { progress: number }) => JSX.Element
export type Viewer = ({
  imageId,
  children,
}: WithChildren<{
  imageId: string
}>) => JSX.Element
export type SetHeader = (request: Request) => void

export interface ContextProp {
  onError: OnError
  Progress: Progress
  setHeader: SetHeader
}
