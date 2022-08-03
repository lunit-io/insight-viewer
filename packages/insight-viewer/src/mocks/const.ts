export const CORNERSTONE_VIEWPORT_MOCK = {
  colormap: undefined,
  hflip: false,
  invert: false,
  labelmap: false,
  modalityLUT: undefined,
  pixelReplication: false,
  rotation: 0,
  scale: 0.9765625,
  translation: { x: 0, y: 0 },
  vflip: false,
  voi: { windowWidth: 90, windowCenter: 32 },
  voiLUT: undefined,
}

export const CORNERSTONE_IMAGE_MOCK = {
  imageId: 'exampleImageId',
  minPixelValue: 0,
  maxPixelValue: 255,
  slope: 1.0,
  intercept: 0,
  windowCenter: 127,
  windowWidth: 256,
  getPixelData: (): number[] => [0, 255, 255, 0],
  rows: 2,
  columns: 2,
  height: 2,
  width: 2,
  color: false,
  sizeInBytes: 2 * 2 * 2,
}

export const ARROW_HEAD = 'arrow'
export const NORMAL_HEAD = 'normal'

export const LINE_MODE = 'line'
export const TEXT_MODE = 'text'
export const POLYGON_MODE = 'polygon'
export const FREE_LINE_MODE = 'freeLine'

export const RULER_MODE = 'ruler'
export const CIRCLE_MODE = 'circle'

export const MOVE_MODE = 'move'
export const TEXT_MOVE_MODE = 'textMove'
export const START_POINT_MODE = 'startPoint'
export const END_POINT_MODE = 'endPoint'
