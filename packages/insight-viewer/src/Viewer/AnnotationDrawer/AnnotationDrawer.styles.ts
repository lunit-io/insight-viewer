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

export const polyline: ViewerStyle = {
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
