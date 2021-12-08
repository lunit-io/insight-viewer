import { Box } from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import InsightViewer, { useImage, useViewport } from '@lunit/insight-viewer'
import { IMAGES } from '../../../const'
import Contour from './Contour'

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const

function ContourContainer(): JSX.Element {
  const { loadingState, image } = useImage({
    wadouri: IMAGES[12],
  })
  const { viewport, setViewport } = useViewport()

  return (
    <Box data-cy-loaded={loadingState}>
      <Resizable
        style={style}
        defaultSize={{
          width: 1000,
          height: 1000,
        }}
      >
        <InsightViewer
          image={image}
          viewport={viewport}
          onViewportChange={setViewport}
        >
          {loadingState === 'success' && <Contour />}
        </InsightViewer>
      </Resizable>
    </Box>
  )
}

export default ContourContainer
