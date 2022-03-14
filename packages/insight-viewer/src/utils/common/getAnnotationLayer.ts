import { getCircleRadius } from './getCircleRadius'
import { AnnotationLayer, AnnotationMode, Point } from '../../types'

export function getAnnotationLayer(points: Point[], mode: AnnotationMode): AnnotationLayer {
  let annotationLayer: AnnotationLayer

  if (mode === 'circle') {
    annotationLayer = {
      type: 'circle',
      center: points[0],
      radius: getCircleRadius(points),
    }
  } else if (mode === 'line') {
    annotationLayer = {
      type: 'line',
      points: [points[0], points[1]],
    }
  } else {
    annotationLayer = {
      type: mode,
      points,
    }
  }

  return annotationLayer
}
