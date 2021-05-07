import { VIEWER_TYPE } from '../const'

export type WithChildren<T = Record<string, unknown>> = T & {
  children?: React.ReactNode
}

export type ViewerType = typeof VIEWER_TYPE[keyof typeof VIEWER_TYPE]
