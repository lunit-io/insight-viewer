import { getCircleRadius } from './getCircleRadius'
import { getLineLength } from './getLineLength'
import { Image } from '../../Viewer/types'
import { Point, Measurement, MeasurementMode } from '../../types'

export function getMeasurement(
  points: Point[],
  textPoint: Point | null,
  mode: MeasurementMode,
  measurements: Measurement[],
  image: Image | null
): Measurement {
  const [startPoint, endPoint] = points
  const currentId = measurements.length === 0 ? 1 : Math.max(...measurements.map(({ id }) => id), 0) + 1

  const defaultMeasurementInfo: Pick<Measurement, 'id' | 'lineWidth'> = {
    id: currentId,
    lineWidth: 1.5,
  }

  if (mode === 'circle') {
    const { radius, unit } = getCircleRadius(startPoint, endPoint, image)
    return {
      ...defaultMeasurementInfo,
      type: 'circle',
      center: startPoint,
      radius,
      unit,
      textPoint,
    }
  }

  // Ruler EditMode
  const { length, unit } = getLineLength(startPoint, endPoint, image)
  return {
    ...defaultMeasurementInfo,
    type: 'ruler',
    points: [startPoint, endPoint],
    length,
    unit,
    textPoint,
  }
}
