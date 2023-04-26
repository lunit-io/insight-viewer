import useTextBox from '../useTextBox'
import { useOverlayContext } from '../../../contexts'

import { calculateCircleArea } from '../../utils/calculateCircleArea'
import { getCircleConnectingLine } from './utils/getCircleConnectingLine'
import { getCircleEndPoint } from '../../utils/getCircleEndPoint'
import { stringifyPoints } from '../../utils/stringifyPoints'
import { getCircleTextPosition } from './utils/getCircleTextPosition'
import { getCircleRadiusByCenter } from '../../../utils/common/getCircleRadius'
import { modifyConnectingLine } from '../../../utils/common/modifyConnectingLine'

import { HALF_OF_RULER_TEXT_BOX } from '../../../const'
import type { AreaAnnotation } from '../../types'
import type { Point } from '../../../types'

const formatCircleValue = (area: number, unit: string) =>
  `Area = ${area.toLocaleString(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}${unit}2`

const useCircleAnnotation = ({ centerPoint, radius, measuredValue, textPoint, unit }: AreaAnnotation) => {
  const { pixelToCanvas } = useOverlayContext()
  const [textBox, ref] = useTextBox()

  const endPoint = getCircleEndPoint(centerPoint, radius)
  const [centerPointOnCanvas, endPointOnCanvas] = [centerPoint, endPoint].map(pixelToCanvas)
  const drawingRadius = getCircleRadiusByCenter(centerPointOnCanvas, endPointOnCanvas)

  const textPointOnCanvas = textPoint
    ? pixelToCanvas(textPoint)
    : getCircleTextPosition(centerPointOnCanvas, drawingRadius)
  const area = calculateCircleArea(measuredValue)

  const connectingLineToTextBoxCenter = getCircleConnectingLine(
    [centerPointOnCanvas, endPointOnCanvas],
    textPointOnCanvas
  )
  const connectingLineToTextBoxEdge = modifyConnectingLine({ textBox, connectingLineToTextBoxCenter })
  const connectingLine = stringifyPoints(connectingLineToTextBoxEdge)

  const textCenterModifier = textBox ? textBox.height / 2 - HALF_OF_RULER_TEXT_BOX : 0
  const textBoxPoint: Point = [textPointOnCanvas[0], textPointOnCanvas[1] + textCenterModifier]
  const visibility: 'visible' | 'hidden' = textBox !== null ? 'visible' : 'hidden'
  const formattedValue = formatCircleValue(area, unit)

  return {
    centerPointOnCanvas,
    endPointOnCanvas,
    ref,
    formattedValue,
    drawingRadius,
    connectingLine,
    textBoxPoint,
    visibility,
  }
}

export default useCircleAnnotation
