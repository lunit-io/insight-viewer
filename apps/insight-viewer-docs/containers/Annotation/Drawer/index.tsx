import { ChangeEvent, useState } from 'react'
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
import useImageSelect from '../../../components/ImageSelect/useImageSelect'

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
  const [isShowLabel, setIsShowLabel] = useState(false)

  const { ImageSelect, selected } = useImageSelect()
  const { loadingState, image } = useImage({
    wadouri: selected,
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

  const handleShowLabelModeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsShowLabel(event.target.checked)
  }

  return (
    <Box data-cy-loaded={loadingState}>
      <Box>
        <ImageSelect />
      </Box>
      <Box>
        edit mode <Switch data-cy-edit={isEditing} onChange={handleEditModeChange} isChecked={isEditing} />
      </Box>
      <Box>
        show label{' '}
        <Switch data-cy-show-label={isShowLabel} onChange={handleShowLabelModeChange} isChecked={isShowLabel} />
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
      <Button
        data-cy-name="remove-button"
        size="sm"
        marginBottom="10px"
        colorScheme="blue"
        onClick={removeAllAnnotation}
      >
        remove all
      </Button>
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
              showAnnotationLabel={isShowLabel}
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
