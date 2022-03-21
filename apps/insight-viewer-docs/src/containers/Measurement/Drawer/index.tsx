/* eslint-disable import/no-unresolved */
import React, { useState } from 'react'
import { Box, Radio, RadioGroup, Stack, Button } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, {
  MeasurementOverlay,
  useImage,
  useViewport,
  useMeasurement,
  MeasurementMode,
} from '@lunit/insight-viewer'
import { IMAGES } from '../../../const'

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const

/** Mock svg Size */
const DEFAULT_SIZE = { width: 700, height: 700 }

function MeasurementDrawerContainer(): JSX.Element {
  const [measurementMode, setMeasurementMode] = useState<MeasurementMode>('ruler')
  const { loadingState, image } = useImage({
    wadouri: IMAGES[11],
  })

  const { viewport, setViewport } = useViewport()
  const {
    measurements,
    selectedMeasurement,
    addMeasurement,
    removeMeasurement,
    selectMeasurement,
    removeAllMeasurement,
  } = useMeasurement({ mode: measurementMode })

  const handleMeasurementModeClick = (mode: MeasurementMode) => {
    setMeasurementMode(mode)
  }

  return (
    <>
      <Button data-cy-name="remove-button" marginBottom="10px" colorScheme="blue" onClick={removeAllMeasurement}>
        remove all
      </Button>
      <RadioGroup onChange={handleMeasurementModeClick} value={measurementMode}>
        <Stack direction="row">
          <Radio value="ruler">Ruler</Radio>
          <Radio value="circle">Circle - Not implemented yet</Radio>
        </Stack>
      </RadioGroup>
      <Box data-cy-loaded={loadingState}>
        <Resizable style={style} defaultSize={DEFAULT_SIZE}>
          <InsightViewer image={image} viewport={viewport} onViewportChange={setViewport}>
            {loadingState === 'success' && (
              <MeasurementOverlay
                width={DEFAULT_SIZE.width}
                height={DEFAULT_SIZE.height}
                measurements={measurements}
                selectedMeasurement={selectedMeasurement}
                showMeasurementLabel
                onAdd={addMeasurement}
                onFocus={selectMeasurement}
                onRemove={removeMeasurement}
                isDrawing
                mode={measurementMode} // If no mode is defined, the default value is ruler.
              />
            )}
          </InsightViewer>
        </Resizable>
      </Box>
    </>
  )
}

export default MeasurementDrawerContainer
