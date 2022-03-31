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

export const circleStyle: ViewerStyle = {
  default: {
    strokeWidth: '3px',
    stroke: 'rgb(255, 224, 0)',
    transition: 'stroke 120ms ease-out, stroke-width 120ms ease-out',
    fill: 'rgb(255, 224, 0)',
    cursor: 'move',
  },
}
