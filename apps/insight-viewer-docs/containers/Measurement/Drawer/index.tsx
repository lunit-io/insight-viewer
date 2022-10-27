/* eslint-disable import/no-unresolved */
import React, { useState, ChangeEvent, useEffect } from 'react'
import { Box, Switch, Radio, RadioGroup, Stack, Button } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, {
  MeasurementOverlay,
  useImage,
  useViewport,
  useMeasurement,
  MeasurementMode,
} from '@lunit/insight-viewer'
import useImageSelect from '../../../components/ImageSelect/useImageSelect'

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const

/** Mock svg Size */
const DEFAULT_SIZE = { width: 700, height: 700 }

function MeasurementDrawerContainer(): JSX.Element {
  const [measurementMode, setMeasurementMode] = useState<MeasurementMode>('ruler')
  const [isEditing, setIsEditing] = useState(false)

  const { ImageSelect, selected } = useImageSelect()
  const { loadingState, image } = useImage({
    wadouri: selected,
  })

  const { viewport, setViewport } = useViewport()
  const {
    measurements,
    hoveredMeasurement,
    selectedMeasurement,
    addMeasurement,
    hoverMeasurement,
    removeMeasurement,
    selectMeasurement,
    removeAllMeasurement,
  } = useMeasurement({})

  const handleMeasurementModeClick = (mode: MeasurementMode) => {
    setMeasurementMode(mode)
  }

  const handleEditModeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsEditing(event.target.checked)
  }

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Delete') {
        if (selectedMeasurement) {
          removeMeasurement(selectedMeasurement)
          selectMeasurement(null)
        }
      }
    })
  }, [selectedMeasurement])

  return (
    <>
      <Box>
        <ImageSelect />
      </Box>
      <Box>
        edit mode <Switch data-cy-edit={isEditing} onChange={handleEditModeChange} isChecked={isEditing} />
      </Box>
      <RadioGroup onChange={handleMeasurementModeClick} value={measurementMode}>
        <Stack direction="row">
          <Radio value="ruler">Ruler</Radio>
          <Radio value="circle">Circle</Radio>
        </Stack>
      </RadioGroup>
      <Button data-cy-name="remove-button" marginBottom="10px" colorScheme="blue" onClick={removeAllMeasurement}>
        remove all
      </Button>

      <Box data-cy-loaded={loadingState} className={`measurement ${measurementMode}`}>
        <Resizable style={style} defaultSize={DEFAULT_SIZE}>
          <InsightViewer image={image} viewport={viewport} onViewportChange={setViewport}>
            {loadingState === 'success' && (
              <MeasurementOverlay
                width={DEFAULT_SIZE.width}
                height={DEFAULT_SIZE.height}
                measurements={measurements}
                selectedMeasurement={selectedMeasurement}
                hoveredMeasurement={hoveredMeasurement}
                onAdd={addMeasurement}
                onFocus={hoverMeasurement}
                onSelect={selectMeasurement}
                onRemove={removeMeasurement}
                isEditing={isEditing}
                isDrawing
                mode={measurementMode}
                // If no mode is defined, the default value is ruler.
              />
            )}
          </InsightViewer>
        </Resizable>
      </Box>
    </>
  )
}

export default MeasurementDrawerContainer
