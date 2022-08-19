/* eslint-disable import/no-unresolved */
import { Annotation } from '@lunit/insight-viewer'
import { SVGProps } from 'react'

/**
 * This function return mock annotation Data for AnnotationOverlay
 * Just put svg style change information in style
 */
export const getPolygonStyles = (annotation: Annotation, isBorder: boolean): SVGProps<SVGPolygonElement> => ({
  style: {
    strokeWidth: (annotation.lineWidth ?? 1) * 3 + (isBorder ? 4 : 0),
  },
})
