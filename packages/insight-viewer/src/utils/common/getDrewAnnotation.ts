import polylabel from 'polylabel'
import { getArrowPosition } from './getArrowPosition'
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
    drewAnnotation = {
      ...defaultAnnotationInfo,
      type: 'circle',
      center: points[0],
      radius: getCircleRadius(points, image),
    }
  } else if (mode === 'line') {
    drewAnnotation = {
      ...defaultAnnotationInfo,
      type: mode,
      points: [points[0], points[1]],
      headPoints: lineHead === 'arrow' ? getArrowPosition(points) : undefined,
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
