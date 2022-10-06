import React from 'react'

import { MeasurementOverlayProps } from './MeasurementOverlay.types'
import { MeasurementViewer } from '../MeasurementViewer'
import { MeasurementDrawer } from '../MeasurementDrawer'

export function MeasurementOverlay({
  width,
  height,
  measurements,
  hoveredMeasurement,
  selectedMeasurement,
  className,
  style,
  showOutline,
  mode,
  device,
  isDrawing = false,
  isEditing,
  onAdd,
  onFocus,
  onSelect,
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
        hoveredMeasurement={hoveredMeasurement}
        className={className}
        style={style}
        showOutline={showOutline}
        isEditing={isEditing}
        onFocus={onFocus}
        onRemove={onRemove}
        onSelect={onSelect}
      />
      {isDrawing && onAdd && (
        <MeasurementDrawer
          width={width}
          height={height}
          selectedMeasurement={selectedMeasurement}
          hoveredMeasurement={hoveredMeasurement}
          measurements={measurements}
          className={className}
          style={style}
          device={device}
          isEditing={isEditing}
          mode={mode}
          onAdd={onAdd}
          onSelectMeasurement={onSelect}
        />
      )}
    </>
  )
}
