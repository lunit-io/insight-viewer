/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-explicit-any */
import OpenSeadragon from 'openseadragon'

export type TiledImageInstance = {
  type: 'TiledImage'
  url: string
}

export type ViewportInstance = {
  type: 'Viewport'
  zoom: number
  rotation: number
}

export type InvalidInstance = {
  type: 'Invalid'
}
export namespace HostConfig {
  export type Type = string

  export interface Props {
    [key: string]: any
  }

  export type Container = OpenSeadragon.Viewer

  export type Instance = TiledImageInstance | ViewportInstance | InvalidInstance

  export type TextInstance = InvalidInstance

  export type SuspenseInstance = any // Unsupported

  export type HydratableInstance = Instance | TextInstance

  export type PublicInstance = (Instance | TextInstance) & {
    kind: 'PublicInstance'
  }

  export interface HostContext {
    [key: string]: any
  }

  export interface UpdatePayload {
    [key: string]: any
  }

  export type ChildSet = undefined // Unused

  export type TimeoutHandle = number

  export type NoTimeout = -1
}
