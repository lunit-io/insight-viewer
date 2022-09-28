import useTextBox from '../useTextBox'
import { useOverlayContext } from '../../contexts'

import { modifyConnectingLine } from '../../utils/common/modifyConnectingLine'
import { stringifyPoints } from '../../utils/common/stringifyPoints'
import { getRulerTextPosition } from '../../utils/common/getRulerTextPosition'
import { getConnectingLinePoints } from '../../utils/common/getConnectingLinePoints'

import { HALF_OF_RULER_TEXT_BOX } from '../../const'
import type { Point, RulerMeasurement } from '../../types'

const useRulerMeasurement = ({ startAndEndPoint, measuredValue, unit, textPoint }: RulerMeasurement) => {
  const { pixelToCanvas } = useOverlayContext()
  const [textBox, ref] = useTextBox()

  const startAndEndPointOnCanvas = startAndEndPoint.map(pixelToCanvas) as [Point, Point]
  const textPointOnCanvas = textPoint ? pixelToCanvas(textPoint) : getRulerTextPosition(startAndEndPointOnCanvas)
  const connectingLineToTextBoxCenter = getConnectingLinePoints(startAndEndPointOnCanvas, textPointOnCanvas)

  const connectingLineToTextBoxEdge = modifyConnectingLine({
    textBox,
    connectingLineToTextBoxCenter,
  })
  const connectingLine = stringifyPoints(connectingLineToTextBoxEdge)
  const rulerLine = stringifyPoints(startAndEndPointOnCanvas)

  const textCenterModifier = textBox ? textBox.height / 2 - HALF_OF_RULER_TEXT_BOX : 0
  const textBoxPoint: Point = [textPointOnCanvas[0], textPointOnCanvas[1] + textCenterModifier]
  const visibility: 'visible' | 'hidden' = textBox !== null ? 'visible' : 'hidden'
  const formattedValue = `${measuredValue.toFixed(1)}${unit}`

  return { rulerLine, ref, connectingLine, formattedValue, textBoxPoint, visibility }
}

export default useRulerMeasurement
