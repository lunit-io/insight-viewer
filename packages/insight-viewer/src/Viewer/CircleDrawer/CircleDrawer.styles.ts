import { ViewerStyle } from '../../types'

export const circleStyle: ViewerStyle = {
  default: {
    strokeWidth: '3px',
    stroke: '#ffffff',
    transition: 'stroke 120ms ease-out, stroke-width 120ms ease-out',
    fill: 'transparent',
  },
  outline: {
    fill: 'transparent',
    strokeWidth: '3px',
    stroke: '#000000',
  },
  hover: {
    stroke: 'rgb(255, 194, 17)',
    fill: 'rgba(0, 0, 0, 0.4)',
    strokeWidth: '3px',
  },
}

export const textStyle: ViewerStyle = {
  default: {
    fill: '#ffffff',
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
  },
}
