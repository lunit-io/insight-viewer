import polylabel from 'polylabel'
import { getCircleRadiusByMeasuringUnit } from './getCircleRadius'
import { Annotation, AnnotationMode, LineHeadMode, Point } from '../../types'
import { Image } from '../../Viewer/types'
import { LINE_TEXT_POSITION_SPACING } from '../../const'

export function getDrewAnnotation(
  image: Image | null,
  points: Point[],
  currentId: number,
  mode: AnnotationMode,
  lineHead: LineHeadMode
): Annotation {
  const [xPosition, yPosition] = polylabel([points], 1)

  const defaultAnnotationInfo: Pick<Annotation, 'id' | 'labelPosition' | 'lineWidth'> = {
    id: currentId,
    labelPosition: [xPosition, yPosition],
    lineWidth: 1.5,
  }

  let drewAnnotation: Annotation

  if (mode === 'circle') {
    const [startPoint, endPoint] = points
    const { radius } = getCircleRadiusByMeasuringUnit(startPoint, endPoint, image)
    drewAnnotation = {
      ...defaultAnnotationInfo,
      type: 'circle',
      center: points[0],
      radius,
    }
  } else if (mode === 'line') {
    drewAnnotation = {
      ...defaultAnnotationInfo,
      labelPosition: [xPosition - LINE_TEXT_POSITION_SPACING.x, yPosition - LINE_TEXT_POSITION_SPACING.y],
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
