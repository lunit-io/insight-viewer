import type { Image } from '../../Viewer/types'
import type { Viewport, ViewportOptions } from '../../types'

export interface UseRenewalViewportParams {
  image: Image | undefined
  element: HTMLDivElement | undefined
  options?: ViewportOptions
  getInitialViewport?: (defaultViewport: Viewport) => Viewport
}

export interface UseRenewalViewportReturnType {
  viewport: Viewport
  initialized: boolean
  resetViewport: () => void
  getDefaultViewport: () => void
  setViewport: (setViewportAction: SetViewportAction) => void
}

export type SetViewportAction = Viewport | ((prevViewport: Viewport) => Viewport)
