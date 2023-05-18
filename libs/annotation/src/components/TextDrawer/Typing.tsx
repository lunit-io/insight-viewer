import React, { useState, useEffect } from 'react'

import { useOverlayContext } from '@lunit/insight-viewer'
import { TEXT_PADDING } from '../../const'
import { TypingProps } from './Typing.types'
import { textStyle, svgBoxStyle } from '../../viewer.styles'

export function Typing({ points, onFinish }: TypingProps): React.ReactElement | null {
  const [editArea, setEditArea] = useState<HTMLDivElement | null>()

  const { pixelToCanvas } = useOverlayContext()
  const canvasPoints = points.map(pixelToCanvas)
  const [start, end] = canvasPoints

  const handleBlur = (): void => {
    if (editArea && onFinish) {
      onFinish(editArea.innerText.replace(/\n\n/g, '\n')) // remove contentEditable + innerText problem
    }
  }
  useEffect(() => {
    if (editArea) {
      editArea.focus()
    }
  }, [editArea])

  if (typeof end === 'undefined' || end[0] < start[0] || end[1] < start[1]) {
    return null
  }
  const dimensions = [end[0] - start[0], end[1] - start[1]]
  return (
    <>
      <rect
        className="annotation-text typing grab"
        style={svgBoxStyle.select}
        x={start[0]}
        y={start[1]}
        width={dimensions[0]}
        height={dimensions[1]}
      />
      <foreignObject x={start[0]} y={start[1]} width={dimensions[0]} height={dimensions[1]}>
        <div
          contentEditable
          className="annotation-text typing grab"
          ref={(div) => setEditArea(div)}
          onBlur={handleBlur}
          style={{
            ...textStyle.select,
            width: dimensions[0],
            height: dimensions[1],
            paddingLeft: TEXT_PADDING,
            color: '#ffffff',
            outline: 'none',
          }}
        />
      </foreignObject>
    </>
  )
}
