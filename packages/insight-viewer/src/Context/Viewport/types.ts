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
  _initial?: Partial<BasicViewport>
}
