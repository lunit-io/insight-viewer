import type { Image } from '../../Viewer/types'
import type { Viewport, ViewportOptions } from '../../types'

export interface UseViewportParams {
  image: Image | undefined
  element: HTMLDivElement | undefined
  options?: ViewportOptions
  getInitialViewport?: (defaultViewport: Viewport) => Viewport
}

export interface UseViewportReturnType {
  viewport: Viewport
  initialized: boolean
  resetViewport: () => void
  getDefaultViewport: (image: Image | undefined, element: HTMLDivElement | undefined) => void
  setViewport: (setViewportAction: SetViewportAction) => void
}

export type SetViewportAction = Viewport | ((prevViewport: Viewport) => Viewport)
