/* eslint-disable import/no-unresolved */
import React, { useState, ChangeEvent } from 'react'
import { Box, Switch } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, {
  AnnotationOverlay,
  useImage,
  useAnnotation,
  useViewport,
  Annotation,
} from '@lunit/insight-viewer'
import { IMAGES } from '../../../const'
import { ANNOTATIONS } from '../../../../mocks/annotations'
import { getPolygonStyles } from '../../../utils/common/getPolygonStyles'
import CodeBlock from '../../../components/CodeBlock'
import { CODE } from './Code'

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const

/** Mock svg Size */
const DEFAULT_SIZE = { width: 500, height: 500 }

function PolygonContainer(): JSX.Element {
  const [isEdit, setIsEdit] = useState(false)
  const { loadingState, image } = useImage({
    wadouri: IMAGES[12],
  })
  const { viewport, setViewport } = useViewport()
  const { annotations, selectedAnnotation, removeAnnotation, focusAnnotation } = useAnnotation<Annotation>({
    mode: 'polygon',
    initalAnnotation: ANNOTATIONS,
  })

  const handleEditSwitchClick = (event: ChangeEvent<HTMLInputElement>) => {
    setIsEdit(event.target.checked)
  }

  return (
    <>
      <Box data-cy-loaded={loadingState}>
        <Box>
          isEdit <Switch onChange={handleEditSwitchClick} className="hflip-control" isChecked={isEdit} />
        </Box>
        <Resizable style={style} defaultSize={DEFAULT_SIZE}>
          <InsightViewer image={image} viewport={viewport} onViewportChange={setViewport}>
            {loadingState === 'success' && (
              <AnnotationOverlay
                selectedAnnotation={selectedAnnotation}
                width={DEFAULT_SIZE.width}
                height={DEFAULT_SIZE.height}
                annotations={annotations}
                annotationAttrs={getPolygonStyles}
                showAnnotationLabel
                mode="polygon" // If no mode is defined, the default value is polygon.
                onFocus={isEdit ? focusAnnotation : undefined}
                onRemove={isEdit ? removeAnnotation : undefined}
              />
            )}
          </InsightViewer>
        </Resizable>
      </Box>
      <Box>
        <CodeBlock code={CODE} />
      </Box>
    </>
  )
}

export default PolygonContainer
