import { getLineLength } from './getLineLength'
import { getCircleRadiusByMeasuringUnit, getCircleRadius } from './getCircleRadius'

import type { Image } from '../../Viewer/types'
import type { Point, Measurement, MeasurementMode } from '../../types'

export function getMeasurement(
  points: [mouseDownPoint: Point, mouseUpPoint: Point],
  textPoint: Point | null,
  mode: MeasurementMode,
  measurements: Measurement[],
  image: Image | null
): Measurement {
  const [mouseDownPoint, mouseUpPoint] = points
  const currentId = measurements.length === 0 ? 1 : Math.max(...measurements.map(({ id }) => id), 0) + 1

  const defaultMeasurementInfo: Pick<Measurement, 'id' | 'lineWidth'> = {
    id: currentId,
    lineWidth: 1.5,
  }

  if (mode === 'circle') {
    const radiusWithoutUnit = getCircleRadius(mouseDownPoint, mouseUpPoint)
    const { radius, unit } = getCircleRadiusByMeasuringUnit(mouseDownPoint, mouseUpPoint, image)

    return {
      ...defaultMeasurementInfo,
      type: 'circle',
      centerPoint: mouseDownPoint,
      textPoint,
      radius: radiusWithoutUnit,
      measuredValue: radius,
      unit,
    }
  }

  // Ruler EditMode
  const { length, unit } = getLineLength(mouseDownPoint, mouseUpPoint, image)
  return {
    ...defaultMeasurementInfo,
    type: 'ruler',
    textPoint,
    startAndEndPoint: [mouseDownPoint, mouseUpPoint],
    measuredValue: length,
    unit,
  }
}
