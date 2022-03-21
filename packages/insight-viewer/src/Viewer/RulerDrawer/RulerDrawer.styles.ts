import { ViewerStyle } from '../../types'

export const textStyle: ViewerStyle = {
  default: {
    fill: '#ffffff',
    fontWeight: 600,
    textAnchor: 'middle',
  },
  select: {
    fill: 'rgb(255, 194, 17)',
    fontWeight: 600,
    textAnchor: 'middle',
  },
}

export const polyline: ViewerStyle = {
  default: {
    fill: 'rgba(255, 244, 0, 0.2)',
    strokeWidth: '5px',
    stroke: 'rgb(255, 224, 0)',
  },
}
