import type { Point } from '../types'

const getDistance = (pointA: Point, pointB: Point) => {
  return Math.pow(pointA[0] - pointB[0], 2) + Math.pow(pointA[1] - pointB[1], 2)
}

const getIntersectedPoint = (width: number, height: number, line: [Point, Point]): Point => {
  const centerWeight = width / 2
  const centerHeight = height / 2

  const [x1, y1] = line[0]
  const [x2, y2] = line[1]

  const dx = x1 - x2
  const dy = y1 - y2

  if (dx === 0 && dy === 0) return [x2, y2]

  const tanPhi = centerHeight / centerWeight
  const tanTheta = Math.abs(dy / dx)

  const quadrantX = Math.sign(dx)
  const quadrantY = Math.sign(dy)

  if (tanTheta > tanPhi) {
    return [x2 + (centerHeight / tanTheta) * quadrantX, y2 + centerHeight * quadrantY]
  } else {
    return [x2 + centerWeight * quadrantX, y2 + centerWeight * tanTheta * quadrantY]
  }
}

const findTheMostClosePoint = (targetPoint: Point, comparedPoints: Point[]) => {
  const distances = comparedPoints.map((point) => getDistance(targetPoint, point))
  const minDistance = Math.min(...distances)
  const index = distances.indexOf(minDistance)

  return comparedPoints[index]
}

const getPointsOfTextBox = ({
  textBoxCenter,
  textBoxWidth,
  textBoxHeight,
}: {
  textBoxCenter: Point
  textBoxWidth: number
  textBoxHeight: number
}) => {
  const textBoxCenterUp: Point = [textBoxCenter[0], textBoxCenter[1] - textBoxHeight / 2]
  const textBoxCenterDown: Point = [textBoxCenter[0], textBoxCenter[1] + textBoxHeight / 2]
  const textBoxCenterLeft: Point = [textBoxCenter[0] - textBoxWidth / 2, textBoxCenter[1]]
  const textBoxCenterRight: Point = [textBoxCenter[0] + textBoxWidth / 2, textBoxCenter[1]]

  return [textBoxCenterUp, textBoxCenterDown, textBoxCenterLeft, textBoxCenterRight]
}

export const modifyConnectingLine = ({
  textBox,
  connectingLineToTextBoxCenter,
}: {
  textBox: { width: number; height: number } | null
  connectingLineToTextBoxCenter: [Point, Point]
}) => {
  if (!textBox) return connectingLineToTextBoxCenter

  const { width: textBoxWidth, height: textBoxHeight } = textBox
  const intersectedPoint = getIntersectedPoint(textBoxWidth, textBoxHeight, connectingLineToTextBoxCenter)
  const [startPoint, textBoxCenter] = connectingLineToTextBoxCenter
  const textBoxPoints = getPointsOfTextBox({
    textBoxCenter,
    textBoxWidth,
    textBoxHeight,
  })
  const newEndPoint = findTheMostClosePoint(intersectedPoint, textBoxPoints)

  return [startPoint, newEndPoint]
}
