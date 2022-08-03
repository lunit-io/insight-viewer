import { ViewerStyle } from 'types'

export const svgStyle: ViewerStyle = {
  default: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}

export const circleStyle: ViewerStyle = {
  default: {
    strokeWidth: '2px',
    stroke: '#ffffff',
    fill: '#ffffff',
    cursor: 'move',
  },
  highlight: {
    strokeWidth: '2px',
    stroke: '#00FFF0',
    fill: '#00FFF0',
    cursor: 'move',
  },
  select: {
    strokeWidth: '2px',
    stroke: '#FFD600',
    fill: '#FFD600',
    cursor: 'move',
  },
  outline: {
    strokeWidth: '3px',
    stroke: '#000000',
    fill: 'transparent',
  },
  selectedOutline: {
    strokeWidth: '4px',
    stroke: '#ffffff',
    fill: 'transparent',
  },
  hover: {
    strokeWidth: '2px',
    stroke: '#FFD600',
    fill: '#FFD600',
    cursor: 'move',
  },
}
