/* eslint-disable import/no-unresolved */
import React, { ChangeEvent, useState } from 'react'
import { Box, Switch, Radio, RadioGroup, Stack, Button } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, {
  useAnnotation,
  useImage,
  useViewport,
  AnnotationOverlay,
  AnnotationMode,
  LineHeadMode,
} from '@lunit/insight-viewer'
import { IMAGES } from '../../../const'

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const

/** Mock svg Size */
const DEFAULT_SIZE = { width: 700, height: 700 }

function AnnotationDrawerContainer(): JSX.Element {
  const [annotationMode, setAnnotationMode] = useState<AnnotationMode>('polygon')
  const [lineHeadMode, setLineHeadMode] = useState<LineHeadMode>('normal')
  const [isEditing, setIsEditing] = useState(false)

  const { loadingState, image } = useImage({
    wadouri: IMAGES[11],
  })
  const { viewport, setViewport } = useViewport()
  const {
    annotations,
    hoveredAnnotation,
    selectedAnnotation,
    addAnnotation,
    removeAnnotation,
    hoverAnnotation,
    selectAnnotation,
    removeAllAnnotation,
  } = useAnnotation()

  const handleAnnotationModeClick = (mode: AnnotationMode) => {
    setAnnotationMode(mode)
  }

  const handleLineHeadModeButtonChange = (lineHead: LineHeadMode) => {
    setLineHeadMode(lineHead)
  }

  const handleEditModeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsEditing(event.target.checked)
  }

  return (
    <Box data-cy-loaded={loadingState}>
      <Button data-cy-name="remove-button" marginBottom="10px" colorScheme="blue" onClick={removeAllAnnotation}>
        remove all
      </Button>
      <Box>
        edit mode <Switch data-cy-edit={isEditing} onChange={handleEditModeChange} isChecked={isEditing} />
      </Box>
      <RadioGroup onChange={handleAnnotationModeClick} value={annotationMode}>
        <Stack direction="row">
          <p style={{ marginRight: '10px' }}>Select Annotation mode</p>
          <Radio value="polygon">Polygon</Radio>
          <Radio value="line">line</Radio>
          <Radio value="freeLine">Free Line</Radio>
          <Radio value="text">Text</Radio>
          <Radio value="circle">Circle - Not implemented yet</Radio>
        </Stack>
      </RadioGroup>
      <RadioGroup onChange={handleLineHeadModeButtonChange} value={lineHeadMode}>
        <Stack direction="row">
          <p style={{ marginRight: '10px' }}>Select Line Head mode</p>
          <Radio value="normal">normal</Radio>
          <Radio value="arrow">arrow</Radio>
        </Stack>
      </RadioGroup>
      <Resizable style={style} defaultSize={DEFAULT_SIZE}>
        <InsightViewer image={image} viewport={viewport} onViewportChange={setViewport}>
          {loadingState === 'success' && (
            <AnnotationOverlay
              isDrawing
              isEditing={isEditing}
              width={700}
              height={700}
              lineHead={lineHeadMode}
              mode={annotationMode}
              annotations={annotations}
              hoveredAnnotation={hoveredAnnotation}
              selectedAnnotation={selectedAnnotation}
              showAnnotationLabel
              onAdd={addAnnotation}
              onFocus={hoverAnnotation}
              onRemove={removeAnnotation}
              onSelect={selectAnnotation}
            />
          )}
        </InsightViewer>
      </Resizable>
    </Box>
  )
}

export default AnnotationDrawerContainer