export type WithChildren<T = Record<string, unknown>> = T & {
  children?: React.ReactNode
}

export type ViewerType = 'wado' | 'web'
