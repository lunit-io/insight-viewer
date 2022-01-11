import { CSSProperties } from 'react'

type ContourStyleType = 'default' | 'focus' | 'outline'
type ContourStyle = { [styleType in ContourStyleType]?: CSSProperties }

export const svgStyle: ContourStyle = {
  default: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}

export const textStyle: ContourStyle = {
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
  focus: {
    fill: 'rgb(255, 194, 17)',
    fontWeight: 600,
    textAnchor: 'middle',
  },
}

export const polygonStyle: ContourStyle = {
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
  focus: {
    stroke: 'rgb(255, 194, 17)',
    fill: 'rgba(0, 0, 0, 0.4)',
    strokeWidth: '3px',
  },
}
