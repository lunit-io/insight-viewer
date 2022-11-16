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
  /** @deprecated use arrow line instead */
  lineHead: LineHeadMode
): Annotation {
  const [xPosition, yPosition] = polylabel([points], 1)

  const defaultAnnotationInfo: Pick<Annotation, 'id' | 'labelPosition' | 'lineWidth'> = {
    id: currentId,
    labelPosition: [xPosition, yPosition],
    lineWidth: 1.5,
  }

  switch (mode) {
    case 'circle': {
      const [startPoint, endPoint] = points
      /**
       * TODO
       * start point should be a center since the radius calculation logic has changed
       * by the circle Measurement function change
       */
      const { radius } = getCircleRadiusByMeasuringUnit(startPoint, endPoint, image)
      return {
        ...defaultAnnotationInfo,
        type: 'circle',
        center: points[0],
        radius,
      }
    }
    case 'line': {
      return {
        ...defaultAnnotationInfo,
        labelPosition: [xPosition - LINE_TEXT_POSITION_SPACING.x, yPosition - LINE_TEXT_POSITION_SPACING.y],
        type: mode,
        points: [points[0], points[1]],
        hasArrowHead: lineHead === 'arrow',
      }
    }
    case 'arrowLine': {
      return {
        ...defaultAnnotationInfo,
        labelPosition: [xPosition - LINE_TEXT_POSITION_SPACING.x, yPosition - LINE_TEXT_POSITION_SPACING.y],
        type: mode,
        points: [points[0], points[1]],
      }
    }
    case 'text': {
      return {
        ...defaultAnnotationInfo,
        type: mode,
        points: [points[0], points[1]],
        label: '',
      }
    }
    default: {
      return {
        ...defaultAnnotationInfo,
        type: mode,
        points,
      }
    }
  }
}
