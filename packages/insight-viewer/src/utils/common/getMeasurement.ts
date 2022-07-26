import { getCircleRadius } from './getCircleRadius'
import { getLineLength } from './getLineLength'
import { Image } from '../../Viewer/types'
import { Point, Measurement, MeasurementMode, RulerCalcOption } from '../../types'

export function getMeasurement(
  points: Point[],
  textPoint: Point | null,
  mode: MeasurementMode,
  measurements: Measurement[],
  image: Image | null,
  { unit, kind }: RulerCalcOption
): Measurement {
  const [startPoint, endPoint] = points
  const currentId = measurements.length === 0 ? 1 : Math.max(...measurements.map(({ id }) => id), 0) + 1

  const defaultMeasurementInfo: Pick<Measurement, 'id' | 'lineWidth'> = {
    id: currentId,
    lineWidth: 1.5,
  }

  if (mode === 'circle') {
    return {
      ...defaultMeasurementInfo,
      type: 'circle',
      center: startPoint,
      radius: getCircleRadius(startPoint, endPoint, image, kind),
      textPoint,
      unit,
    }
  }

  // Ruler mode
  return {
    ...defaultMeasurementInfo,
    type: 'ruler',
    points: [startPoint, endPoint],
    length: getLineLength(startPoint, endPoint, image, kind),
    textPoint,
    unit,
  }
}
