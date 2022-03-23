/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef } from 'react'

import { RulerDrawer } from '../RulerDrawer'
import { svgStyle } from './MeasurementDrawer.styles'
import { MeasurementDrawerProps } from './MeasurementDrawer.types'
import useMeasurementDrawing from '../../hooks/useMeasurementDrawing'

export function MeasurementDrawer({
  style,
  width,
  height,
  device,
  measurements,
  className,
  mode = 'ruler',
  onAdd,
}: MeasurementDrawerProps): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null)
  const [measurementPoints] = useMeasurementDrawing({
    mode,
    device,
    measurements,
    svgElement: svgRef,
    onAdd,
  })

  return (
    <>
      {measurementPoints.length > 1 ? (
        <svg ref={svgRef} width={width} height={height} style={{ ...svgStyle.default, ...style }} className={className}>
          {mode === 'ruler' && <RulerDrawer points={measurementPoints} />}
        </svg>
      ) : null}
    </>
  )
}
