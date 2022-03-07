/* eslint-disable import/no-unresolved */
import React, { useState, ChangeEvent } from 'react'
import { Box, Switch } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, {
  useAnnotation,
  useImage,
  useViewport,
  AnnotationOverlay,
  Annotation,
} from '@lunit/insight-viewer'
import { IMAGES } from '../../../const'
import { initialAnnotation } from '../../../../mocks/freeLines'

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const

/** Mock svg Size */
const DEFAULT_SIZE = { width: 700, height: 700 }

function FreeLineContainer(): JSX.Element {
  const [isEdit, setIsEdit] = useState(false)
  const { loadingState, image } = useImage({
    wadouri: IMAGES[12],
  })
  const { viewport, setViewport } = useViewport()
  const { annotations, focusedAnnotation, removeAnnotation, focusAnnotation } = useAnnotation<Annotation>({
    mode: 'freeLine',
    initalAnnotation: initialAnnotation,
  })

  const handleEditSwitchClick = (event: ChangeEvent<HTMLInputElement>) => {
    setIsEdit(event.target.checked)
  }

  return (
    <Box data-cy-loaded={loadingState}>
      <Box>
        isEdit <Switch onChange={handleEditSwitchClick} className="hflip-control" isChecked={isEdit} />
      </Box>
      <Resizable style={style} defaultSize={DEFAULT_SIZE}>
        <InsightViewer image={image} viewport={viewport} onViewportChange={setViewport}>
          {loadingState === 'success' && (
            <AnnotationOverlay
              width={700}
              height={700}
              annotations={annotations}
              focusedAnnotation={focusedAnnotation}
              mode="freeLine"
              onFocus={isEdit ? focusAnnotation : undefined}
              onRemove={isEdit ? removeAnnotation : undefined}
            />
          )}
        </InsightViewer>
      </Resizable>
    </Box>
  )
}

export default FreeLineContainer
