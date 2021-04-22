export type WithChildren<T = Record<string, unknown>> = T & {
  children?: React.ReactNode
}

export type WidthHeight = {
  width: number | '100%'
  height: number | '100%'
}
