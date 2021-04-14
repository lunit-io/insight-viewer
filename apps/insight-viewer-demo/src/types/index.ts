export type WithChildren<T = Record<string, unknown>> = T & {
  children?: React.ReactNode
}

export type WithoutProp = (p: WithChildren) => JSX.Element
