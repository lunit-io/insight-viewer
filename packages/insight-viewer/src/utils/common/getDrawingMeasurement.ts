import { getLineLengthWithoutImage } from './getLineLengthWithoutImage'

import { Point, Measurement, DrawingMeasurement } from '../../types'

export function getDrawingMeasurement(
  points: [Point, Point],
  measurement: Measurement,
  pixelToCanvas: (point: Point) => Point
): DrawingMeasurement {
  let drawingMeasurement: DrawingMeasurement

  const canvasPoints = points.map(pixelToCanvas) as [Point, Point]

  if (measurement.type === 'ruler') {
    const linePoints = measurement.points
      .map(point => {
        // drawing 시 point 좌표계는 pixelToCanvas 를 적용해야하므로 아래 로직을 추가
        const [x, y] = pixelToCanvas(point)

        return `${x},${y}`
      })
      .join(' ')

    drawingMeasurement = { ...measurement, linePoints }
  } else {
    // measurement.type === 'circle'
    const drawingRadius = getLineLengthWithoutImage(canvasPoints[0], canvasPoints[1])

    drawingMeasurement = {
      ...measurement,
      drawingRadius,
    }
  }

  return drawingMeasurement
}
