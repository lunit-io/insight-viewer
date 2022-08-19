import { Box } from '@chakra-ui/react'
import InsightViewer, { useImage, useViewport } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import OverlayLayer from '../../components/OverlayLayer'
import CustomProgress from '../../components/CustomProgress'
import { ViewerWrapper } from '../../components/Wrapper'
import { CODE } from './Code'
import { IMAGES, CODE_SANDBOX } from '../../const'

function Overlay(): JSX.Element {
  const { loadingState, image } = useImage({
    wadouri: IMAGES[9],
  })
  const { viewport, setViewport } = useViewport()

  return (
    <Box data-cy-loaded={loadingState}>
      <ViewerWrapper>
        <InsightViewer
          image={image}
          viewport={viewport}
          onViewportChange={setViewport}
          Progress={CustomProgress}
        >
          <OverlayLayer viewport={viewport} />
        </InsightViewer>
      </ViewerWrapper>
      <Box>
        <CodeBlock code={CODE} codeSandbox={CODE_SANDBOX.overlay} />
      </Box>
    </Box>
  )
}

export default Overlay
