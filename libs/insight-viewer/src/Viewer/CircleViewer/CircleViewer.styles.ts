import { ViewerStyle } from '../../types'

export const circleStyle: ViewerStyle = {
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
  extendsArea: {
    fill: 'transparent',
    strokeWidth: '20px',
    stroke: 'transparent',
    cursor: 'pointer',
  },
}
