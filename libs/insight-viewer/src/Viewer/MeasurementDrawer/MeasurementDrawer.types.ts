import { SVGProps } from 'react'
import { EditMode, Measurement, MeasurementMode } from '../../types'
import { EditPoints } from '../../utils/common/getEditPointPosition'

export interface MeasurementDrawerProps extends SVGProps<SVGSVGElement> {
  selectedMeasurement: Measurement | null
  isEditing?: boolean

  editPoints: EditPoints | null
  measurement: Measurement | null
  currentEditMode: EditMode | null
  setMeasurementEditMode: (targetPoint: EditMode) => void
  onSelectMeasurement: (measurement: Measurement | null) => void

  // /**
  //  * Access Device Settings
  //  * Only the function for mouse is implemented, and it is not applied
  //  */
  // device?: 'all' | 'mouse-only' | 'touch-only' | 'stylus-only' | 'mouse-and-stylus'
}
