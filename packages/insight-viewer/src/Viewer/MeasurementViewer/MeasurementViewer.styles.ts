import { ViewerStyle } from '../../types'

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
    transition: 'stroke 120ms ease-out, stroke-width 120ms ease-out',
    fill: 'none',
  },
  outline: {
    fill: 'none',
    strokeWidth: '3px',
    stroke: '#000000',
  },
  hover: {
    stroke: 'rgb(255, 194, 17)',
    fill: 'none',
    strokeWidth: '3px',
    cursor: 'pointer',
  },
}

export const textStyle: ViewerStyle = {
  default: {
    fill: '#09a9c4',
    fontWeight: 600,
    textAnchor: 'middle',
  },
  outline: {
    fill: 'transparent',
    fontWeight: 600,
    textAnchor: 'middle',
    stroke: '#000000',
    strokeWidth: '2.5px',
  },
  hover: {
    fill: 'rgb(255, 194, 17)',
    fontWeight: 600,
    textAnchor: 'middle',
    cursor: 'pointer',
  },
}
