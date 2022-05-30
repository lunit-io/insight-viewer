import { ViewerStyle } from '../../types'

export const TEXT_SIZE = 14
export const LINE_HEIGHT = 1.4

export const svgStyle: ViewerStyle = {
  default: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}

export const textStyle: ViewerStyle = {
  default: {
    fill: '#ffffff',
    paintOrder: 'stroke',
    stroke: '#000000',
    strokeWidth: '1px',
    strokeLinecap: 'butt',
    strokeLinejoin: 'miter',
    fontSize: TEXT_SIZE,
    lineHeight: LINE_HEIGHT,
    fontWeight: 600,
    textAnchor: 'middle',
  },
  hover: {
    fill: '#00FFF0',
    paintOrder: 'stroke',
    stroke: '#000000',
    strokeWidth: '1px',
    strokeLinecap: 'butt',
    strokeLinejoin: 'miter',
    fontSize: TEXT_SIZE,
    lineHeight: LINE_HEIGHT,
    fontWeight: 600,
    textAnchor: 'middle',
  },
}

export const polygonStyle: ViewerStyle = {
  default: {
    fill: 'transparent',
    strokeWidth: '2px',
    stroke: '#FAFAFB',
  },
  outline: {
    fill: 'transparent',
    strokeWidth: '2.5px',
    stroke: '#000000',
  },
  hoveredOutline: {
    fill: 'transparent',
    strokeWidth: '2.5px',
    stroke: '#99999B',
  },
}

export const polylineStyle: ViewerStyle = {
  default: {
    strokeWidth: '2px',
    stroke: '#ffffff',
    fill: 'transparent',
  },
  outline: {
    fill: 'transparent',
    strokeWidth: '2.5px',
    stroke: '#000000',
  },
  hoveredOutline: {
    fill: 'transparent',
    strokeWidth: '2.5px',
    stroke: '#99999B',
  },
}

export const textBoxStyle: ViewerStyle = {
  default: {
    fill: 'transparent',
    stroke: 'transparent',
  },
  hover: {
    fill: 'transparent',
    stroke: 'rgb(0, 201, 234)',
    strokeWidth: '1px',
  },
}
