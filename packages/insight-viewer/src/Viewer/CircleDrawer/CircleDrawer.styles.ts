import { ViewerStyle } from '../../types'

export const TEXT_SIZE = 14
export const LINE_HEIGHT = 1.4

export const circleStyle: ViewerStyle = {
  default: {
    fill: 'transparent',
    strokeWidth: '3px',
    stroke: '#FAFAFB',
    cursor: 'grab',
  },
  outline: {
    stroke: '#000000',
    strokeWidth: '4px',
    fill: 'transparent',
    cursor: 'grab',
  },
  select: {
    stroke: '#00FFF0',
    strokeWidth: '3px',
    fill: 'transparent',
    cursor: 'grab',
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

export const polyline: ViewerStyle = {
  dashLine: {
    strokeWidth: '1px',
    stroke: '#ffffff',
    fill: 'transparent',
    strokeDasharray: '5, 5',
  },
}
