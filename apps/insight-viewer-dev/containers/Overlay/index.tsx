import { useRef } from 'react'
import { Box } from '@chakra-ui/react'
import InsightViewer, { useImage } from '@lunit/insight-viewer'
import { useViewport } from '@lunit/insight-viewer/viewport'
import { IMAGES } from '@insight-viewer-library/fixtures'
import CodeBlock from '../../components/CodeBlock'
import OverlayLayer from '../../components/OverlayLayer'
import CustomProgress from '../../components/CustomProgress'
import { ViewerWrapper } from '../../components/Wrapper'
import { CODE } from './Code'
import { CODE_SANDBOX } from '../../const'

function Overlay(): JSX.Element {
  const viewerRef = useRef<HTMLDivElement>(null)

  const { loadingState, image } = useImage({
    wadouri: IMAGES[9],
  })
  const { viewport, setViewport } = useViewport({
    image,
    viewerRef,
  })

  return (
    <Box data-cy-loaded={loadingState}>
      <ViewerWrapper>
        <InsightViewer
          viewerRef={viewerRef}
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
