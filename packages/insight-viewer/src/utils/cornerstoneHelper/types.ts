import cornerstone, { EnabledElement, PixelCoordinate } from 'cornerstone-core'

export type CornerstoneImage = cornerstone.Image
export type CornerstoneViewport = Required<
  Pick<
    cornerstone.Viewport,
    | 'scale'
    | 'translation'
    | 'voi'
    | 'invert'
    | 'pixelReplication'
    | 'hflip'
    | 'vflip'
    | 'rotation'
    | 'labelmap'
  >
> &
  Pick<cornerstone.Viewport, 'colormap' | 'modalityLUT' | 'voiLUT'>
export type EnabledElementParam = EnabledElement
export type PixelCoordinateParam = PixelCoordinate
