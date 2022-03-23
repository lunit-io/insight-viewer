import { CSSProperties, SVGProps } from 'react'
import { Point, MeasurementMode, Measurement } from '../../types'

export interface MeasurementViewerProps {
  width?: number
  height?: number

  /** Measurement focused by user interaction such as mouse over */
  measurements: Measurement[]

  selectedMeasurement: Measurement | null

  /** <svg className={}> */
  className?: string

  /** <svg style={}> */
  style?: CSSProperties

  /**
   * You can set the attributes of individual measurement objects
   * If you set properties such as strokeWidth, the Style set in Styled Components is ignored
   * It is best not to use it as much as possible except in special cases
   */
  measurementAttrs?: (measurement: Measurement, showOutline: boolean) => SVGProps<SVGPolygonElement>

  onFocus?: (measurement: Measurement | null) => void
  onRemove?: (measurement: Measurement) => void

  /**
   * Draw an outline on the line
   * Since the outline is expressed by drawing two lines, it can be deactivated in a performance-sensitive situation
   */
  showOutline?: boolean

  mode?: MeasurementMode
}

export interface MeasurementsDrawProps extends Omit<MeasurementViewerProps, 'width' | 'height'> {
  mode: MeasurementMode
  showOutline: boolean
  pixelToCanvas: (point: Point) => Point
}
