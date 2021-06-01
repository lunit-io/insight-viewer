import { CornerstoneViewport } from '../cornerstoneHelper'
import { Viewport } from '../../Context/Viewport/types'
import { ViewportContextDefaultValue } from '../../Context/Viewport/const'

const nestedKeys = ['x', 'y', 'windowWidth', 'windowCenter']

export function formatViewport(
  cornerstoneViewport: CornerstoneViewport | undefined
): Viewport {
  if (!cornerstoneViewport) return ViewportContextDefaultValue

  const { scale, invert, hflip, vflip, translation, voi } = cornerstoneViewport

  return {
    scale,
    invert,
    hflip,
    vflip,
    x: translation.x,
    y: translation.y,
    windowWidth: voi.windowWidth,
    windowCenter: voi.windowCenter,
  }
}

type ViewportEntry = [keyof Viewport, Viewport[keyof Viewport]]

export function formatCornerstoneViewport(
  cornerstoneViewport: CornerstoneViewport,
  viewport: Partial<Viewport> = {}
): CornerstoneViewport {
  const translationOrVoiEntries = (Object.entries(
    viewport
  ) as ViewportEntry[]).filter(entry => nestedKeys.includes(entry[0]))
  const translationOrVoi = Object.fromEntries(
    translationOrVoiEntries
  ) as Record<keyof Viewport, number>

  return {
    ...cornerstoneViewport,
    scale: viewport.scale ?? cornerstoneViewport.scale,
    invert: viewport.invert ?? cornerstoneViewport.invert,
    hflip: viewport.hflip ?? cornerstoneViewport.hflip,
    vflip: viewport.vflip ?? cornerstoneViewport.vflip,
    translation: {
      x: translationOrVoi.x ?? cornerstoneViewport.translation.x,
      y: translationOrVoi.y ?? cornerstoneViewport.translation.y,
    },
    voi: {
      windowWidth:
        translationOrVoi.windowWidth ?? cornerstoneViewport.voi.windowWidth,
      windowCenter:
        translationOrVoi.windowCenter ?? cornerstoneViewport.voi.windowCenter,
    },
  }
}
