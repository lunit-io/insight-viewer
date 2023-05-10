/* eslint-disable import/no-unresolved */
import React, { useRef, useState, ChangeEvent, useEffect } from 'react'
import { Box, Switch, Radio, RadioGroup, Stack, Button } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, { useImage } from '@lunit/insight-viewer'
import { AnnotationOverlay } from '@lunit/insight-viewer/annotation'
import { useViewport } from '@lunit/insight-viewer/viewport'
import { MEASURED_ANNOTATIONS } from '@insight-viewer-library/fixtures'

import useImageSelect from '../../../components/ImageSelect/useImageSelect'

import type { Annotation, AnnotationMode } from '@lunit/insight-viewer/annotation'

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const

/** Mock svg Size */
const DEFAULT_SIZE = { width: 700, height: 700 }

function MeasurementDrawer(): JSX.Element {
  const viewerRef = useRef<HTMLDivElement>(null)

  const [annotations, setAnnotations] = useState<Annotation[]>(MEASURED_ANNOTATIONS)
  const [hoveredAnnotation, setHoveredAnnotation] = useState<Annotation | null>(null)
  const [selectedAnnotation, setSelectedAnnotation] = useState<Annotation | null>(null)

  const [annotationMode, setAnnotationMode] = useState<AnnotationMode>('ruler')
  const [isEditing, setIsEditing] = useState(false)
  const [isDrawing, setIsDrawing] = useState(true)

  const { ImageSelect, selected } = useImageSelect()
  const { loadingState, image } = useImage({
    wadouri: selected,
  })

  const { viewport, setViewport } = useViewport({
    image,
    element: viewerRef.current,
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

  const handleResetAnnotation = () => {
    setAnnotations(MEASURED_ANNOTATIONS)
  }

  const handleRemoveAllAnnotation = () => {
    setAnnotations([])
  }

  const handleMeasurementModeClick = (mode: AnnotationMode) => {
    setAnnotationMode(mode)
  }

  const handleEditModeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsEditing(event.target.checked)
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
    <>
      <Box>
        <ImageSelect />
      </Box>
      <Box>
        Draw enabled (D) <Switch data-cy-edit={isDrawing} onChange={handleDrawModeChange} isChecked={isDrawing} />
      </Box>
      <Box>
        Edit enabled (E) <Switch data-cy-edit={isEditing} onChange={handleEditModeChange} isChecked={isEditing} />
      </Box>
      <RadioGroup onChange={handleMeasurementModeClick} value={annotationMode}>
        <Stack direction="row">
          <Radio value="ruler">Ruler</Radio>
          <Radio value="area">Area</Radio>
        </Stack>
      </RadioGroup>
      <Button data-cy-name="reset-button" size="sm" mb={2} mr={3} colorScheme="blue" onClick={handleResetAnnotation}>
        reset
      </Button>
      <Button data-cy-name="remove-button" marginBottom="10px" colorScheme="blue" onClick={handleRemoveAllAnnotation}>
        remove all
      </Button>

      <Box data-cy-loaded={loadingState} className={`measurement ${annotationMode}`}>
        <Resizable style={style} defaultSize={DEFAULT_SIZE}>
          <InsightViewer viewerRef={viewerRef} image={image} viewport={viewport} onViewportChange={setViewport}>
            {loadingState === 'success' && (
              <AnnotationOverlay
                width={DEFAULT_SIZE.width}
                height={DEFAULT_SIZE.height}
                annotations={annotations}
                selectedAnnotation={selectedAnnotation}
                hoveredAnnotation={hoveredAnnotation}
                onHover={handleAnnotationHover}
                onSelect={handleAnnotationSelect}
                clickAction={isEditing ? 'select' : 'remove'}
                isDrawing={isDrawing}
                mode={annotationMode}
                onChange={handleAnnotationsChange}
              />
            )}
          </InsightViewer>
        </Resizable>
      </Box>
    </>
  )
}

export default MeasurementDrawer
