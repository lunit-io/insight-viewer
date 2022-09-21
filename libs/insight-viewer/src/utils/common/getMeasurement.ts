import { getLineLength } from './getLineLength'

import { getCircleCenterPoint } from './getCircleCenterPoint'
import { getCircleRadiusByMeasuringUnit, getCircleRadius } from './getCircleRadius'

import type { Image } from '../../Viewer/types'
import type { Point, Measurement, MeasurementMode } from '../../types'

export function getMeasurement(
  points: [Point, Point],
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
    const centerPoint = getCircleCenterPoint(startPoint, endPoint)
    const radiusWithoutUnit = getCircleRadius(startPoint, endPoint)
    const { radius, unit } = getCircleRadiusByMeasuringUnit(startPoint, endPoint, image)

    return {
      ...defaultMeasurementInfo,
      type: 'circle',
      centerPoint: centerPoint,
      textPoint,
      radius: radiusWithoutUnit,
      measuredValue: radius,
      unit,
    }
  }

  // Ruler EditMode
  const { length, unit } = getLineLength(startPoint, endPoint, image)
  return {
    ...defaultMeasurementInfo,
    type: 'ruler',
    textPoint,
    startAndEndPoint: [startPoint, endPoint],
    measuredValue: length,
    unit,
  }
}
