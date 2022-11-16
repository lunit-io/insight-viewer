import { ChangeEvent, useState, useEffect } from 'react'
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
import { INITIAL_POLYGON_ANNOTATIONS } from '@insight-viewer-library/fixtures'
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
  const [isDrawing, setIsDrawing] = useState(true)
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
    resetAnnotation,
  } = useAnnotation({
    initialAnnotation: INITIAL_POLYGON_ANNOTATIONS,
  })

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

  const handleDrawModeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsDrawing(event.target.checked)
  }

  useEffect(() => {
    function handleKeyDown({ code }: KeyboardEvent) {
      if (code === 'KeyD') {
        setIsDrawing((prev) => !prev)
      }
      if (code === 'KeyE') {
        setIsEditing((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [setIsDrawing, setIsEditing])

  return (
    <Box data-cy-loaded={loadingState}>
      <Box>
        <ImageSelect />
      </Box>
      <Box>
        Draw enabled (D) <Switch data-cy-edit={isDrawing} onChange={handleDrawModeChange} isChecked={isDrawing} />
      </Box>
      <Box>
        Edit enabled (E) <Switch data-cy-edit={isEditing} onChange={handleEditModeChange} isChecked={isEditing} />
      </Box>
      <Box>
        Show label{' '}
        <Switch data-cy-show-label={isShowLabel} onChange={handleShowLabelModeChange} isChecked={isShowLabel} />
      </Box>
      <RadioGroup onChange={handleAnnotationModeClick} value={annotationMode}>
        <Stack direction="row">
          <p style={{ marginRight: '10px' }}>Select Annotation mode</p>
          <Radio value="polygon">Polygon</Radio>
          <Radio value="line">Line</Radio>
          <Radio value="arrowLine">Arrow Line</Radio>
          <Radio value="freeLine">Free Line</Radio>
          <Radio value="text">Text</Radio>
          <Radio value="circle">Circle - Not implemented yet</Radio>
        </Stack>
      </RadioGroup>
      <RadioGroup onChange={handleLineHeadModeButtonChange} value={lineHeadMode}>
        <Stack direction="row">
          <p style={{ marginRight: '10px' }}>Select Line Head mode</p>
          <Radio value="normal">Normal</Radio>
          <Radio value="arrow">Arrow</Radio>
        </Stack>
      </RadioGroup>
      <Button data-cy-name="reset-button" size="sm" mb={2} mr={3} colorScheme="blue" onClick={resetAnnotation}>
        reset
      </Button>
      <Button data-cy-name="remove-button" size="sm" mb={2} colorScheme="blue" onClick={removeAllAnnotation}>
        remove all
      </Button>
      <Resizable style={style} defaultSize={DEFAULT_SIZE} className={`annotation ${annotationMode}`}>
        <InsightViewer image={image} viewport={viewport} onViewportChange={setViewport}>
          {loadingState === 'success' && (
            <AnnotationOverlay
              isDrawing={isDrawing}
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
