import React from 'react'

import { MeasurementOverlayProps } from './MeasurementOverlay.types'
import { MeasurementViewer } from '../MeasurementViewer'
import { MeasurementDrawer } from '../MeasurementDrawer'

export function MeasurementOverlay({
  width,
  height,
  measurements,
  selectedMeasurement,
  className,
  style,
  showOutline,
  mode,
  device,
  isDrawing = false,
  measurementAttrs,
  onFocus,
  onAdd,
  onRemove,
}: MeasurementOverlayProps): JSX.Element {
  if (isDrawing && !onAdd) {
    throw new Error('Please also add onAdd if you enable drawing mode')
  }

  return (
    <>
      <MeasurementViewer
        width={width}
        height={height}
        measurements={measurements}
        selectedMeasurement={selectedMeasurement}
        className={className}
        style={style}
        showOutline={showOutline}
        mode={mode}
        measurementAttrs={measurementAttrs}
        onFocus={onFocus}
        onRemove={onRemove}
      />
      {isDrawing && onAdd && (
        <MeasurementDrawer
          width={width}
          height={height}
          measurements={measurements}
          className={className}
          style={style}
          device={device}
          mode={mode}
          onAdd={onAdd}
        />
      )}
    </>
  )
}
