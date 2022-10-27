import { CornerstoneViewport } from '../cornerstoneHelper/types'
import { Viewport } from '../../types'
import { DefaultViewport } from './const'
import { DEFAULT_VIEWPORT_OPTIONS } from '../../const'

// Format Cornerstone's viewport to viewer's viewport prop.
export function formatViewerViewport(cornerstoneViewport: CornerstoneViewport | undefined): Viewport {
  if (!cornerstoneViewport) return DefaultViewport

  const { scale, invert, hflip, vflip, rotation, translation, voi } = cornerstoneViewport

  return {
    scale,
    invert,
    hflip,
    vflip,
    rotation,
    x: translation.x,
    y: translation.y,
    windowWidth: voi.windowWidth,
    windowCenter: voi.windowCenter,
    _viewportOptions: DEFAULT_VIEWPORT_OPTIONS,
  }
}

// Format the viewer's viewport prop to Cornerstone viewport.
export function formatCornerstoneViewport(
  cornerstoneViewport: CornerstoneViewport,
  viewport: Partial<Viewport> = {}
): CornerstoneViewport {
  return {
    ...cornerstoneViewport,
    scale: viewport.scale ?? cornerstoneViewport.scale,
    invert: viewport.invert ?? cornerstoneViewport.invert,
    hflip: viewport.hflip ?? cornerstoneViewport.hflip,
    vflip: viewport.vflip ?? cornerstoneViewport.vflip,
    rotation: viewport.rotation ?? cornerstoneViewport.rotation,
    translation: {
      x: viewport.x ?? cornerstoneViewport.translation.x,
      y: viewport.y ?? cornerstoneViewport.translation.y,
    },
    voi: {
      windowWidth: viewport.windowWidth ?? cornerstoneViewport.voi.windowWidth,
      windowCenter: viewport.windowCenter ?? cornerstoneViewport.voi.windowCenter,
    },
  }
}
