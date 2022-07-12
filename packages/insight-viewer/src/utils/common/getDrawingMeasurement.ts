import { getLineLengthWithoutImage } from './getLineLengthWithoutImage'

import { Point, Measurement, DrawingMeasurement } from '../../types'

export function getDrawingMeasurement(
  points: [Point, Point],
  measurement: Measurement,
  pixelToCanvas: (point: Point) => Point
): DrawingMeasurement {
  let drawingMeasurement: DrawingMeasurement

  // drawing 시 text 좌표는 pixelToCanvas 를 적용해야하므로 아래 로직을 추가
  const drawingTextPosition = pixelToCanvas(measurement.textPoint)

  if (measurement.type === 'ruler') {
    const linePoints = measurement.points
      .map(point => {
        // drawing 시 point 좌표계는 pixelToCanvas 를 적용해야하므로 아래 로직을 추가
        const [x, y] = pixelToCanvas(point)

        return `${x},${y}`
      })
      .join(' ')

    drawingMeasurement = { ...measurement, linePoints, textPoint: drawingTextPosition }
  } else {
    // measurement.type === 'circle'
    const canvasPoints = points.map(pixelToCanvas)
    const drawingRadius = getLineLengthWithoutImage(canvasPoints[0], canvasPoints[1])

    // drawing 시 center 좌표계는 pixelToCanvas 를 적용해야하므로 아래 로직을 추가
    const drawingCenterPosition = pixelToCanvas(measurement.center)

    drawingMeasurement = {
      ...measurement,
      drawingRadius,
      center: drawingCenterPosition,
      textPoint: drawingTextPosition,
    }
  }

  return drawingMeasurement
}
