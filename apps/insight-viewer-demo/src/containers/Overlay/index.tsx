import { Box } from '@chakra-ui/react'
import Viewer, { useImageLoad, useViewport } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import OverlayLayer from '../../components/OverlayLayer'
import CustomProgress from '../../components/CustomProgress'
import { ViewerWrapper } from '../../components/Wrapper'
import { CODE } from './Code'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'

function Overlay(): JSX.Element {
  const { image } = useImageLoad({
    imageId: IMAGE_ID,
  })
  const { viewport, setViewport } = useViewport()

  return (
    <Box>
      <ViewerWrapper>
        <Viewer.Dicom
          image={image}
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
