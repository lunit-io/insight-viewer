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
    pointerEvents: 'none',
  },
}

export const polylineStyle: ViewerStyle = {
  default: {
    strokeWidth: '3px',
    stroke: '#ffffff',
    fill: 'transparent',
    cursor: 'pointer',
  },
  outline: {
    fill: 'transparent',
    strokeWidth: '4px',
    stroke: '#000000',
    cursor: 'pointer',
  },
  hoveredOutline: {
    fill: 'transparent',
    strokeWidth: '4px',
    stroke: '#99999B',
    cursor: 'pointer',
  },
  dashLine: {
    strokeWidth: '1px',
    stroke: '#ffffff',
    fill: 'transparent',
    strokeDasharray: '5, 5',
  },
  extendsArea: {
    fill: 'transparent',
    strokeWidth: '20px',
    stroke: 'transparent',
    cursor: 'pointer',
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
    cursor: 'pointer',
  },
  hover: {
    fill: '#FFFFFF',
    paintOrder: 'stroke',
    stroke: '#DFDFE2',
    strokeWidth: '1px',
    strokeLinecap: 'butt',
    strokeLinejoin: 'miter',
    fontSize: TEXT_SIZE,
    lineHeight: LINE_HEIGHT,
    fontWeight: 600,
    textAnchor: 'middle',
    cursor: 'pointer',
  },
  select: {
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
    cursor: 'grab',
  },
}
