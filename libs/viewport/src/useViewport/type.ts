import type { MutableRefObject } from 'react'
import type { Image, Viewport, ViewportOptions } from '@lunit/insight-viewer'

export interface UseViewportParams {
  image: Image | undefined
  viewerRef: MutableRefObject<HTMLDivElement | null>
  options?: ViewportOptions
  getInitialViewport?: (defaultViewport: Viewport) => Viewport
}

export interface UseViewportReturnType {
  viewport: Viewport
  initialized: boolean
  resetViewport: () => void
  getDefaultViewport: (image: Image | undefined, element: HTMLDivElement | null) => void
  setViewport: (setViewportAction: SetViewportAction) => void
}

export type SetViewportAction = Viewport | ((prevViewport: Viewport) => Viewport)
