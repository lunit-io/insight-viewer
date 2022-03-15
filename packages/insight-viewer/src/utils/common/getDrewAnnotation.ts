import polylabel from 'polylabel'
import { getCircleRadius } from './getCircleRadius'
import { Annotation, AnnotationMode, Point } from '../../types'

export function getDrewAnnotation(points: Point[], mode: AnnotationMode, annotations: Annotation[]): Annotation {
  const [xPosition, yPosition] = polylabel([points], 1)
  const currentId = annotations.length === 0 ? 1 : Math.max(...annotations.map(({ id }) => id), 0) + 1

  const defaultAnnotationInfo: Pick<Annotation, 'id' | 'labelPosition' | 'lineWidth'> = {
    id: currentId,
    labelPosition: [xPosition, yPosition],
    lineWidth: 1.5,
  }

  let drewAnnotation: Annotation

  if (mode === 'circle') {
    drewAnnotation = {
      ...defaultAnnotationInfo,
      type: 'circle',
      center: points[0],
      radius: getCircleRadius(points),
    }
  } else if (mode === 'line') {
    drewAnnotation = {
      ...defaultAnnotationInfo,
      type: 'line',
      points: [points[0], points[1]],
    }
  } else {
    drewAnnotation = {
      ...defaultAnnotationInfo,
      type: mode,
      points,
    }
  }

  return drewAnnotation
}
