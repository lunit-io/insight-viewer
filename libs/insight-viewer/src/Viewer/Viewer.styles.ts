import { CSSProperties } from 'react'

export type ViewerStyleType =
  | 'default'
  | 'select'
  | 'hover'
  | 'outline'
  | 'hoveredOutline'
  | 'selectedOutline'
  | 'highlight'
  | 'dashLine'
  | 'extendsArea'
  | 'selectedExtendsArea'

export type ViewerStyle = {
  [styleType in ViewerStyleType]?: CSSProperties
}

// stroke color
const OUTLINE_COLOR = '#000000'
const DEFAULT_COLOR = '#FFFFFF'
const SELECTED_COLOR = '#00FFF0'
const HOVERED_OUTLINE_COLOR = '#99999B'
const HOVERED_TEXT_BOX_COLOR = '#00C9EA'

// stroke width
const DEFAULT_WIDTH = '3px'
const OUTLINE_WIDTH = '4px'
const TEXT_BOX_WIDTH = '1px'
const DASH_LINE_WIDTH = '1px'
const TEXT_STROKE_WIDTH = '1px'
const EXTENDED_AREA_WIDTH = '12px'

// edit stroke color
const EDIT_POINTER_SELECTED_COLOR = '#FFD600'
const EDIT_POINTER_HIGHLIGHT_COLOR = '#00FFF0'

// edit stroke width
const EDIT_DEFAULT_WIDTH = '2px'
const EDIT_OUTLINE_WIDTH = '3px'
const EDIT_SELECTED_OUTLINE_WIDTH = '4px'

export const TEXT_SIZE = 14
export const FONT_WIDTH = 600
export const LINE_HEIGHT = 1.4

export const svgRootStyle: ViewerStyle = {
  default: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}

export const svgWrapperStyle: ViewerStyle = {
  default: {
    strokeWidth: DEFAULT_WIDTH,
    stroke: DEFAULT_COLOR,
    fill: 'transparent',
    cursor: 'pointer',
  },
  outline: {
    fill: 'transparent',
    strokeWidth: OUTLINE_WIDTH,
    stroke: OUTLINE_COLOR,
    cursor: 'pointer',
  },
  hoveredOutline: {
    fill: 'transparent',
    strokeWidth: OUTLINE_WIDTH,
    stroke: HOVERED_OUTLINE_COLOR,
    cursor: 'pointer',
  },
  dashLine: {
    strokeWidth: DASH_LINE_WIDTH,
    stroke: DEFAULT_COLOR,
    fill: 'transparent',
    strokeDasharray: '5, 5',
  },
  extendsArea: {
    fill: 'transparent',
    strokeWidth: EXTENDED_AREA_WIDTH,
    stroke: 'transparent',
    cursor: 'pointer',
  },
  selectedExtendsArea: {
    fill: 'transparent',
    strokeWidth: EXTENDED_AREA_WIDTH,
    stroke: 'transparent',
    cursor: 'grab',
  },
  select: {
    stroke: SELECTED_COLOR,
    strokeWidth: DEFAULT_WIDTH,
    fill: 'transparent',
    cursor: 'grab',
  },
}

export const svgBoxStyle: ViewerStyle = {
  default: {
    fill: 'transparent',
    stroke: 'transparent',
    cursor: 'pointer',
  },
  hover: {
    fill: 'transparent',
    stroke: HOVERED_TEXT_BOX_COLOR,
    strokeWidth: TEXT_BOX_WIDTH,
    cursor: 'pointer',
  },
  select: {
    fill: 'transparent',
    stroke: HOVERED_TEXT_BOX_COLOR,
    strokeWidth: TEXT_BOX_WIDTH,
    cursor: 'grab',
  },
}

export const editPointerStyle: ViewerStyle = {
  default: {
    strokeWidth: EDIT_DEFAULT_WIDTH,
    stroke: DEFAULT_COLOR,
    fill: DEFAULT_COLOR,
    cursor: 'move',
  },
  highlight: {
    strokeWidth: EDIT_DEFAULT_WIDTH,
    stroke: EDIT_POINTER_HIGHLIGHT_COLOR,
    fill: EDIT_POINTER_HIGHLIGHT_COLOR,
    cursor: 'move',
  },
  select: {
    strokeWidth: EDIT_DEFAULT_WIDTH,
    stroke: EDIT_POINTER_SELECTED_COLOR,
    fill: EDIT_POINTER_SELECTED_COLOR,
    cursor: 'move',
  },
  outline: {
    strokeWidth: EDIT_OUTLINE_WIDTH,
    stroke: OUTLINE_COLOR,
    fill: 'transparent',
  },
  selectedOutline: {
    strokeWidth: EDIT_SELECTED_OUTLINE_WIDTH,
    stroke: DEFAULT_COLOR,
    fill: 'transparent',
  },
  hover: {
    strokeWidth: EDIT_DEFAULT_WIDTH,
    stroke: EDIT_POINTER_SELECTED_COLOR,
    fill: EDIT_POINTER_SELECTED_COLOR,
    cursor: 'move',
  },
  extendsArea: {
    fill: 'transparent',
    strokeWidth: EXTENDED_AREA_WIDTH,
    stroke: 'transparent',
    cursor: 'move',
  },
}

export const textStyle: ViewerStyle = {
  default: {
    fill: DEFAULT_COLOR,
    paintOrder: 'stroke',
    stroke: OUTLINE_COLOR,
    strokeWidth: TEXT_STROKE_WIDTH,
    strokeLinecap: 'butt',
    strokeLinejoin: 'miter',
    fontSize: TEXT_SIZE,
    lineHeight: LINE_HEIGHT,
    fontWeight: FONT_WIDTH,
    textAnchor: 'middle',
    cursor: 'pointer',
  },
  hover: {
    fill: '#FFFFFF',
    paintOrder: 'stroke',
    stroke: '#DFDFE2',
    strokeWidth: TEXT_STROKE_WIDTH,
    strokeLinecap: 'butt',
    strokeLinejoin: 'miter',
    fontSize: TEXT_SIZE,
    lineHeight: LINE_HEIGHT,
    fontWeight: FONT_WIDTH,
    textAnchor: 'middle',
    cursor: 'pointer',
  },
  select: {
    fill: '#00FFF0',
    paintOrder: 'stroke',
    stroke: OUTLINE_COLOR,
    strokeWidth: TEXT_STROKE_WIDTH,
    strokeLinecap: 'butt',
    strokeLinejoin: 'miter',
    fontSize: TEXT_SIZE,
    lineHeight: LINE_HEIGHT,
    fontWeight: FONT_WIDTH,
    textAnchor: 'middle',
    cursor: 'grab',
  },
}
