import { useRef, ChangeEvent, useState, useEffect } from 'react'
import { Box, Switch, Radio, RadioGroup, Stack, Button } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, { useImage } from '@lunit/insight-viewer'
import { useViewport } from '@lunit/insight-viewer/viewport'
import { AnnotationMode, AnnotationOverlay } from '@lunit/insight-viewer/annotation'
import { INITIAL_POLYGON_ANNOTATIONS } from '@insight-viewer-library/fixtures'
import useImageSelect from '../../../components/ImageSelect/useImageSelect'
import CodeBlock from '../../../components/CodeBlock'

import { BASE_CODE } from './Code'

import type { Annotation } from '@lunit/insight-viewer/annotation'

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const

/** Mock svg Size */
const DEFAULT_SIZE = { width: 700, height: 700 }

function AnnotationDrawerContainer(): JSX.Element {
  const viewerRef = useRef<HTMLDivElement>(null)

  const [hasInitialAnnotations, setHasInitialAnnotations] = useState<boolean>(true)
  const [annotations, setAnnotations] = useState<Annotation[]>(hasInitialAnnotations ? INITIAL_POLYGON_ANNOTATIONS : [])
  const [hoveredAnnotation, setHoveredAnnotation] = useState<Annotation | null>(null)
  const [selectedAnnotation, setSelectedAnnotation] = useState<Annotation | null>(null)

  const [annotationMode, setAnnotationMode] = useState<AnnotationMode>('polygon')
  const [isDrawing, setIsDrawing] = useState<boolean>(true)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isShowLabel, setIsShowLabel] = useState<boolean>(false)

  const { ImageSelect, selected } = useImageSelect()
  const { loadingState, image } = useImage({
    wadouri: selected,
  })
  const { viewport, setViewport } = useViewport({
    image,
    viewerRef,
  })

  const handleAnnotationsChange = (annotations: Annotation[]) => {
    setAnnotations(annotations)
  }

  const handleAnnotationSelect = (annotation: Annotation | null) => {
    setSelectedAnnotation(annotation)
  }

  const handleAnnotationHover = (annotation: Annotation | null) => {
    setHoveredAnnotation(annotation)
  }

  const handleRemoveAllAnnotation = () => {
    setAnnotations([])
  }

  const handleResetAnnotation = () => {
    setAnnotations(hasInitialAnnotations ? INITIAL_POLYGON_ANNOTATIONS : [])
  }

  const handleInitialAnnotationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHasInitialAnnotations(event.target.checked)
  }

  const handleAnnotationModeClick = (mode: AnnotationMode) => {
    setAnnotationMode(mode)
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
        Initial Viewport enabled{' '}
        <Switch
          data-cy-initial-annotations={hasInitialAnnotations}
          onChange={handleInitialAnnotationChange}
          isChecked={hasInitialAnnotations}
        />
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
          <Radio value="point">Point</Radio>
          <Radio value="text">Text</Radio>
          <Radio value="ruler">Ruler</Radio>
          <Radio value="area">Area</Radio>
        </Stack>
      </RadioGroup>
      <Button data-cy-name="reset-button" size="sm" mb={2} mr={3} colorScheme="blue" onClick={handleResetAnnotation}>
        reset
      </Button>
      <Button data-cy-name="remove-button" size="sm" mb={2} colorScheme="blue" onClick={handleRemoveAllAnnotation}>
        remove all
      </Button>
      <Resizable
        style={style}
        defaultSize={DEFAULT_SIZE}
        className={isDrawing ? `annotation ${annotationMode}` : 'pointer'}
      >
        <InsightViewer viewerRef={viewerRef} image={image} viewport={viewport} onViewportChange={setViewport}>
          {loadingState === 'success' && (
            <AnnotationOverlay
              isDrawing={isDrawing}
              clickAction={isEditing ? 'select' : 'remove'}
              mode={annotationMode}
              annotations={annotations}
              hoveredAnnotation={hoveredAnnotation}
              selectedAnnotation={selectedAnnotation}
              showAnnotationLabel={isShowLabel}
              onHover={handleAnnotationHover}
              onSelect={handleAnnotationSelect}
              onChange={handleAnnotationsChange}
            />
          )}
        </InsightViewer>
      </Resizable>
      <Box>
        <CodeBlock code={BASE_CODE} />
      </Box>
    </Box>
  )
}

export default AnnotationDrawerContainer
