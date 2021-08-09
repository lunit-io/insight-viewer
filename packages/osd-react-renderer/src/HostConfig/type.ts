/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-explicit-any */
import TiledImage from '../elements/TiledImage'
import Viewport from '../elements/Viewport'
import InvalidElement from '../elements/InvalidElement'
import Base from '../elements/Base'
import Root from '../elements/Root'

export namespace HostConfig {
  export type Type = string

  export interface Props {
    [key: string]: any
  }

  export type InvalidInstance = {
    type: 'Invalid'
  }

  export type Container = Base

  export type Instance = TiledImage | Viewport | Root | InvalidElement

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
