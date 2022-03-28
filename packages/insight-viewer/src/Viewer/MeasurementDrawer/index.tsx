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

  const { points, setMeasurementEditMode } = useMeasurementPointsHandler({
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
          {mode === 'ruler' && <RulerDrawer setMeasurementEditMode={setMeasurementEditMode} points={points} />}
          {isEditing && selectedMeasurement && (
            <>
              <circle
                onMouseDown={() => setMeasurementEditMode('startPoint')}
                cx={points[0][0]}
                cy={points[0][1]}
                r={EDIT_CIRCLE_RADIUS}
                style={circleStyle.default}
              />
              <circle
                onMouseDown={() => setMeasurementEditMode('endPoint')}
                cx={points[1][0]}
                cy={points[1][1]}
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
