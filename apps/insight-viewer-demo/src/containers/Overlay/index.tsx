import { Box } from '@chakra-ui/react'
import ImageViewer, { useImage, useViewport } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import OverlayLayer from '../../components/OverlayLayer'
import CustomProgress from '../../components/CustomProgress'
import { ViewerWrapper } from '../../components/Wrapper'
import { CODE } from './Code'
import { IMAGES } from '../../const'

function Overlay(): JSX.Element {
  const { loadingState, image } = useImage({
    imageId: IMAGES[9],
  })
  const { viewport, setViewport } = useViewport()

  return (
    <Box data-cy-loaded={loadingState}>
      <ViewerWrapper>
        <ImageViewer
          image={image}
          viewport={viewport}
          onViewportChange={setViewport}
          Progress={CustomProgress}
        >
          <OverlayLayer viewport={viewport} />
        </ImageViewer>
      </ViewerWrapper>
      <Box>
        <CodeBlock code={CODE} />
      </Box>
    </Box>
  )
}

export default Overlay
