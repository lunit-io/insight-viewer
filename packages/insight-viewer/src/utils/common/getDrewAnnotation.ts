import polylabel from 'polylabel'
import { getCircleRadius } from './getCircleRadius'
import { Annotation, AnnotationMode, LineHeadMode, Point } from '../../types'
import { Image } from '../../Viewer/types'

export function getDrewAnnotation(
  image: Image | null,
  points: Point[],
  mode: AnnotationMode,
  lineHead: LineHeadMode,
  annotations: Annotation[]
): Annotation {
  const [xPosition, yPosition] = polylabel([points], 1)
  const currentId = annotations.length === 0 ? 1 : Math.max(...annotations.map(({ id }) => id), 0) + 1

  const defaultAnnotationInfo: Pick<Annotation, 'id' | 'labelPosition' | 'lineWidth'> = {
    id: currentId,
    labelPosition: [xPosition, yPosition],
    lineWidth: 1.5,
  }

  let drewAnnotation: Annotation

  if (mode === 'circle') {
    const [startPoint, endPoint] = points
    const { radius } = getCircleRadius(startPoint, endPoint, image)
    drewAnnotation = {
      ...defaultAnnotationInfo,
      type: 'circle',
      center: points[0],
      radius,
    }
  } else if (mode === 'line') {
    drewAnnotation = {
      ...defaultAnnotationInfo,
      type: mode,
      points: [points[0], points[1]],
      hasArrowHead: lineHead === 'arrow',
    }
  } else if (mode === 'text') {
    drewAnnotation = {
      ...defaultAnnotationInfo,
      type: mode,
      points: [points[0], points[1]],
      label: '',
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
