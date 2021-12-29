/* eslint-disable import/no-unresolved */
import { Contour } from '@lunit/insight-viewer'
import { SVGProps } from 'react'

/**
 * This function return mock Contour Data for SvgContourViewer
 * Just put svg style change information in style
 */
export const getPolygonStyles = (
  contour: Contour,
  isBorder: boolean
): SVGProps<SVGPolygonElement> => ({
  style: {
    strokeWidth: contour.lineWidth * 3 + (isBorder ? 4 : 0),
  },
})
