import { AnnotationStyle } from '../types'

export const svgStyle: AnnotationStyle = {
  default: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}

export const polyline: AnnotationStyle = {
  default: {
    fill: 'rgba(255, 244, 0, 0.2)',
    strokeWidth: '5px',
    stroke: 'rgb(255, 224, 0)',
  },
  highlight: {
    stroke: '#ffffff',
    strokeWidth: '5px',
    strokeDasharray: '10, 10',
    strokeDashoffset: '1000',
    fill: 'transparent',
  },
}
