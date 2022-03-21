import { AnnotationStyle } from '../../types'

export const svgStyle: AnnotationStyle = {
  default: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}

export const textStyle: AnnotationStyle = {
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
  select: {
    fill: 'rgb(255, 194, 17)',
    fontWeight: 600,
    textAnchor: 'middle',
  },
}

export const polygonStyle: AnnotationStyle = {
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

export const polylineStyle: AnnotationStyle = {
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
