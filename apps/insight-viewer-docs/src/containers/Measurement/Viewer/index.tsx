/* eslint-disable import/no-unresolved */
import React, { useState, ChangeEvent } from 'react'
import { Box, Switch, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, {
  useMeasurement,
  useImage,
  useViewport,
  MeasurementOverlay,
  MeasurementMode,
  Measurement,
} from '@lunit/insight-viewer'
import { IMAGES } from '../../../const'
import { RULER_MEASUREMENTS } from '../../../../mocks/ruler'

export type InitalMeasurements = {
  [mode in MeasurementMode]: Measurement[]
}

const INITIAL_MEASUREMENTS: InitalMeasurements = {
  ruler: RULER_MEASUREMENTS,
  circle: RULER_MEASUREMENTS,
}

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const

/** Mock svg Size */
const DEFAULT_SIZE = { width: 700, height: 700 }

function MeasurementViewerContainer(): JSX.Element {
  const [measurementMode, setMeasurementMode] = useState<MeasurementMode>('ruler')
  const [isEdit, setIsEdit] = useState(false)
  const [isShowLabel, setIsShowLabel] = useState(false)
  const { loadingState, image } = useImage({
    wadouri: IMAGES[11],
  })
  const { viewport, setViewport } = useViewport()
  const { measurements, selectedMeasurement, removeMeasurement, selectMeasurement } = useMeasurement({
    mode: measurementMode,
    initalMeasurement: INITIAL_MEASUREMENTS[measurementMode],
  })

  const handleEditModeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsEdit(event.target.checked)
  }

  const handleShowLabelModeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsShowLabel(event.target.checked)
  }

  const handleMeasurementModeChange = (mode: MeasurementMode) => {
    setMeasurementMode(mode)
  }

  return (
    <Box data-cy-loaded={loadingState}>
      <Box>
        edit mode <Switch onChange={handleEditModeChange} isChecked={isEdit} />
      </Box>
      <Box>
        show label <Switch onChange={handleShowLabelModeChange} isChecked={isShowLabel} />
      </Box>
      <RadioGroup onChange={handleMeasurementModeChange} value={measurementMode}>
        <Stack direction="row">
          <p style={{ marginRight: '10px' }}>Select Head mode</p>
          <Radio value="ruler">Ruler</Radio>
          <Radio value="circle">Circle - Not implemented yet</Radio>
        </Stack>
      </RadioGroup>
      <Resizable style={style} defaultSize={DEFAULT_SIZE}>
        <InsightViewer image={image} viewport={viewport} onViewportChange={setViewport}>
          {loadingState === 'success' && (
            <MeasurementOverlay
              width={700}
              height={700}
              measurements={measurements}
              selectedMeasurement={selectedMeasurement}
              mode={measurementMode}
              showMeasurementLabel={isShowLabel}
              onFocus={isEdit ? selectMeasurement : undefined}
              onRemove={isEdit ? removeMeasurement : undefined}
            />
          )}
        </InsightViewer>
      </Resizable>
    </Box>
  )
}

export default MeasurementViewerContainer
