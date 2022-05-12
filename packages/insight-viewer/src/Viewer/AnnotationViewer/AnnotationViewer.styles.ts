import { ViewerStyle } from '../../types'

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
    fontWeight: 600,
    textAnchor: 'middle',
  },
  select: {
    fill: '#00FFF0',
    paintOrder: 'stroke',
    stroke: '#000000',
    strokeWidth: '1px',
    strokeLinecap: 'butt',
    strokeLinejoin: 'miter',
    fontWeight: 600,
    textAnchor: 'middle',
  },
}

export const polygonStyle: ViewerStyle = {
  default: {
    fill: 'transparent',
    strokeWidth: '3px',
    stroke: '#ffffff',
  },
  outline: {
    fill: 'transparent',
    strokeWidth: '7px',
    stroke: '#000000',
  },
  select: {
    stroke: 'rgb(255, 194, 17)',
    fill: 'rgba(0, 0, 0, 0.4)',
    strokeWidth: '3px',
  },
}

export const polylineStyle: ViewerStyle = {
  default: {
    strokeWidth: '3px',
    stroke: '#ffffff',
    transition: 'stroke 120ms ease-out, stroke-width 120ms ease-out',
    fill: 'none',
  },
  outline: {
    fill: 'none',
    strokeWidth: '3px',
    stroke: '#000000',
  },
  select: {
    stroke: 'rgb(255, 194, 17)',
    fill: 'none',
    strokeWidth: '3px',
  },
}

export const textBoxStyle: ViewerStyle = {
  default: {
    fill: 'transparent',
    stroke: 'transparent',
  },
  select: {
    fill: 'transparent',
    stroke: 'rgb(0, 201, 234)',
    strokeWidth: '1px',
  },
}
