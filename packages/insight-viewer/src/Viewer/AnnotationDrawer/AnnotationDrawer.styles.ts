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

export const polyline: ViewerStyle = {
  default: {
    fill: 'rgba(255, 255, 255, 0.2)',
    strokeWidth: '2px',
    stroke: '#FAFAFB',
  },
  outline: {
    stroke: '#000000',
    strokeWidth: '2.5px',
    fill: 'transparent',
  },
  select: {
    stroke: '#00FFF0',
    strokeWidth: '2px',
    fill: 'transparent',
  },
}
