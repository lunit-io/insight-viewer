import { Box } from '@chakra-ui/react'
import Viewer, { useViewport } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import OverlayLayer from '../../components/OverlayLayer'
import CustomProgress from '../../components/CustomProgress'
import { ViewerWrapper } from '../../components/Wrapper'
import { CODE } from './Code'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'

function Overlay(): JSX.Element {
  const { viewport, setViewport } = useViewport()

  return (
    <Box>
      <ViewerWrapper>
        <Viewer.Dicom
          imageId={IMAGE_ID}
          viewport={viewport}
          onViewportChange={setViewport}
          Progress={CustomProgress}
        >
          <OverlayLayer viewport={viewport} />
        </Viewer.Dicom>
      </ViewerWrapper>
      <Box>
        <CodeBlock code={CODE} />
      </Box>
    </Box>
  )
}

export default Overlay
