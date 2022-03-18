/* eslint-disable import/no-unresolved */
import React, { useState, ChangeEvent } from 'react'
import { Box, Switch, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, {
  useAnnotation,
  useImage,
  useViewport,
  AnnotationOverlay,
  AnnotationMode,
  Annotation,
} from '@lunit/insight-viewer'
import { IMAGES } from '../../../const'
import { FREELINE_ANNOTATIONS } from '../../../../mocks/freeLines'
import { POLYGON_ANNOTATIONS } from '../../../../mocks/polygons'
import { LINE_ANNOTATIONS } from '../../../../mocks/lines'

export type InitalAnnotations = {
  [mode in AnnotationMode]: Annotation[]
}

const INITIAL_ANNOTATIONS: InitalAnnotations = {
  line: LINE_ANNOTATIONS,
  freeLine: FREELINE_ANNOTATIONS,
  polygon: POLYGON_ANNOTATIONS,
  // TODO: // TODO: Changed the mock data when adding Circle mode
  circle: POLYGON_ANNOTATIONS,
}

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const

/** Mock svg Size */
const DEFAULT_SIZE = { width: 700, height: 700 }

function AnnotationViewerContainer(): JSX.Element {
  const [annotationMode, setAnnotationMode] = useState<AnnotationMode>('polygon')
  const [isEdit, setIsEdit] = useState(false)
  const [isShowLabel, setIsShowLabel] = useState(false)
  const { loadingState, image } = useImage({
    wadouri: IMAGES[12],
  })
  const { viewport, setViewport } = useViewport()
  const { annotations, selectedAnnotation, removeAnnotation, selectAnnotation } = useAnnotation({
    mode: annotationMode,
    initalAnnotation: INITIAL_ANNOTATIONS[annotationMode],
  })

  const handleEditSwitchClick = (event: ChangeEvent<HTMLInputElement>) => {
    setIsEdit(event.target.checked)
  }

  const handleShowLabelSwitchClick = (event: ChangeEvent<HTMLInputElement>) => {
    setIsShowLabel(event.target.checked)
  }

  const handleAnnotationModeClick = (mode: AnnotationMode) => {
    setAnnotationMode(mode)
  }

  return (
    <Box data-cy-loaded={loadingState}>
      <Box>
        edit mode <Switch onChange={handleEditSwitchClick} isChecked={isEdit} />
      </Box>
      <Box>
        show label <Switch onChange={handleShowLabelSwitchClick} isChecked={isShowLabel} />
      </Box>
      <RadioGroup onChange={handleAnnotationModeClick} value={annotationMode}>
        <Stack direction="row">
          <p style={{ marginRight: '10px' }}>Select Head mode</p>
          <Radio value="polygon">Polygon</Radio>
          <Radio value="line">line</Radio>
          <Radio value="freeLine">Free Line</Radio>
          <Radio value="circle">Circle - development</Radio>
        </Stack>
      </RadioGroup>
      <Resizable style={style} defaultSize={DEFAULT_SIZE}>
        <InsightViewer image={image} viewport={viewport} onViewportChange={setViewport}>
          {loadingState === 'success' && (
            <AnnotationOverlay
              width={700}
              height={700}
              annotations={annotations}
              selectedAnnotation={selectedAnnotation}
              mode={annotationMode}
              showAnnotationLabel={isShowLabel}
              onFocus={isEdit ? selectAnnotation : undefined}
              onRemove={isEdit ? removeAnnotation : undefined}
            />
          )}
        </InsightViewer>
      </Resizable>
    </Box>
  )
}

export default AnnotationViewerContainer
