export type MouseDown = 'pan' | undefined
export interface Viewport {
  scale: number
  invert: boolean
  hflip: boolean
  vflip: boolean
  x: number
  y: number
  windowWidth: number
  windowCenter: number
  mouseDown: MouseDown // TODO: adjust
}
export type SetViewport = (message: Partial<Viewport>) => void
