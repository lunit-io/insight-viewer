/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef } from 'react'

import { RulerDrawer } from '../RulerDrawer'
import { svgStyle, circleStyle } from './MeasurementDrawer.styles'
import { MeasurementDrawerProps } from './MeasurementDrawer.types'
import useMeasurementPointsHandler from '../../hooks/useMeasurementPointsHandler'
import { EDIT_CIRCLE_RADIUS } from '../../const'

export function MeasurementDrawer({
  style,
  width,
  height,
  device,
  isEditing = false,
  measurements,
  selectedMeasurement,
  className,
  mode = 'ruler',
  onAdd,
  onSelectMeasurement,
}: MeasurementDrawerProps): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null)

  const { points, setEditTargetPoint } = useMeasurementPointsHandler({
    mode,
    device,
    isEditing,
    measurements,
    svgElement: svgRef,
    selectedMeasurement,
    onSelectMeasurement,
    addMeasurement: onAdd,
  })

  const getEditPointPosition = () => {
    const [startPoint, endPoint] = points
    const [startPointX, startPointY] = startPoint
    const [endPointX, endPointY] = endPoint

    return { startPointX, startPointY, endPointX, endPointY }
  }

  return (
    <>
      {points.length > 1 ? (
        <svg ref={svgRef} width={width} height={height} style={{ ...svgStyle.default, ...style }} className={className}>
          {mode === 'ruler' && <RulerDrawer setEditTargetPoint={setEditTargetPoint} points={points} />}
          {isEditing && selectedMeasurement && (
            <>
              <circle
                onMouseDown={() => setEditTargetPoint('startPoint')}
                cx={getEditPointPosition().startPointX}
                cy={getEditPointPosition().startPointY}
                r={EDIT_CIRCLE_RADIUS}
                style={circleStyle.default}
              />
              <circle
                onMouseDown={() => setEditTargetPoint('endPoint')}
                cx={getEditPointPosition().endPointX}
                cy={getEditPointPosition().endPointY}
                r={EDIT_CIRCLE_RADIUS}
                style={circleStyle.default}
              />
            </>
          )}
        </svg>
      ) : null}
    </>
  )
}
