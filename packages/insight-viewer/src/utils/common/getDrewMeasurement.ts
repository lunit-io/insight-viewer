import polylabel from 'polylabel'
import { getCircleRadius } from './getCircleRadius'
import { getLineLength } from './getLineLength'
import { Image } from '../../Viewer/types'
import { Point, Measurement, MeasurementMode } from '../../types'

export function getDrewMeasurement(
  points: Point[],
  mode: MeasurementMode,
  measurements: Measurement[],
  image: Image | null
): Measurement {
  const [startPoint, endPoint] = points
  const [xPosition, yPosition] = polylabel([points], 1)
  const currentId = measurements.length === 0 ? 1 : Math.max(...measurements.map(({ id }) => id), 0) + 1
  const lineLength = image ? Number(getLineLength(startPoint, endPoint, image)?.toFixed(2)) : null

  const defaultAnnotationInfo: Pick<Measurement, 'id' | 'labelPosition' | 'lineWidth'> = {
    id: currentId,
    labelPosition: [xPosition, yPosition],
    lineWidth: 1.5,
  }

  let drewMeasurement: Measurement

  if (mode === 'circle') {
    drewMeasurement = {
      ...defaultAnnotationInfo,
      type: 'circle',
      center: startPoint,
      radius: getCircleRadius(points),
    }
  } else {
    drewMeasurement = {
      ...defaultAnnotationInfo,
      type: 'ruler',
      points: [startPoint, endPoint],
      length: lineLength,
    }
  }

  return drewMeasurement
}
