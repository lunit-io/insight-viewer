/* eslint-disable import/no-unresolved */
import React, { useState, ChangeEvent } from 'react'
import { Box, Switch } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, { useImage, useViewport, useAnnotation, AnnotationOverlay } from '@lunit/insight-viewer'
import { IMAGES } from '../../../const'
import { initialAnnotation } from '../../../../mocks/lines'

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const

/** Mock svg Size */
const DEFAULT_SIZE = { width: 700, height: 700 }

function LineContainer(): JSX.Element {
  const [isEdit, setIsEdit] = useState(false)
  const { loadingState, image } = useImage({
    wadouri: IMAGES[12],
  })
  const { viewport, setViewport } = useViewport()
  const { annotations, selectedAnnotation, removeAnnotation, selectAnnotation } = useAnnotation({
    mode: 'line',
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
              selectedAnnotation={selectedAnnotation}
              showAnnotationLabel={false}
              onFocus={isEdit ? selectAnnotation : undefined}
              onRemove={isEdit ? removeAnnotation : undefined}
              mode="line"
            />
          )}
        </InsightViewer>
      </Resizable>
    </Box>
  )
}

export default LineContainer
