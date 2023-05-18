import useTextBox from '../useTextBox'
import { useOverlayContext } from '@lunit/insight-viewer'
import { HALF_OF_RULER_TEXT_BOX } from '../../const'

import { modifyConnectingLine } from '../../utils/modifyConnectingLine'
import { stringifyPoints } from '../../utils/stringifyPoints'
import { getRulerTextPosition } from './utils/getRulerTextPosition'
import { getRulerConnectingLine } from './utils/getRulerConnectingLine'

import type { Point } from '../../types'
import type { RulerAnnotation } from '../../types'

const formatRulerValue = (measuredValue: number, unit: string) => `${measuredValue.toFixed(1)}${unit}`

const useRulerAnnotation = ({ startAndEndPoint, measuredValue, unit, textPoint }: RulerAnnotation) => {
  const { pixelToCanvas } = useOverlayContext()
  const [textBox, ref] = useTextBox()

  const startAndEndPointOnCanvas = startAndEndPoint.map(pixelToCanvas) as [Point, Point]
  const textPointOnCanvas = textPoint ? pixelToCanvas(textPoint) : getRulerTextPosition(startAndEndPointOnCanvas)
  const connectingLineToTextBoxCenter = getRulerConnectingLine(startAndEndPointOnCanvas, textPointOnCanvas)

  const connectingLineToTextBoxEdge = modifyConnectingLine({
    textBox,
    connectingLineToTextBoxCenter,
  })
  const connectingLine = stringifyPoints(connectingLineToTextBoxEdge)
  const rulerLine = stringifyPoints(startAndEndPointOnCanvas)

  const textCenterModifier = textBox ? textBox.height / 2 - HALF_OF_RULER_TEXT_BOX : 0
  const textBoxPoint: Point = [textPointOnCanvas[0], textPointOnCanvas[1] + textCenterModifier]
  const visibility: 'visible' | 'hidden' = textBox !== null ? 'visible' : 'hidden'
  const formattedValue = formatRulerValue(measuredValue, unit)

  return { rulerLine, ref, connectingLine, formattedValue, textBoxPoint, visibility }
}

export default useRulerAnnotation
