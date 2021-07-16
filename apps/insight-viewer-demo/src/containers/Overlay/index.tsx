import { Box } from '@chakra-ui/react'
import Viewer, { useViewport } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import OverlayLayer from '../../components/OverlayLayer'
import CustomProgress from '../../components/CustomProgress'
import { CODE } from './Code'
import useIsMount from '../../hooks/useIsMount'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'

function Overlay(): JSX.Element {
  const { viewport, setViewport } = useViewport()
  const isMount = useIsMount()

  return (
    <Box w={700}>
      <Box w={500} h={500} className={isMount ? 'is-mount' : ''}>
        <Viewer.Dicom
          imageId={IMAGE_ID}
          viewport={viewport}
          onViewportChange={setViewport}
          Progress={CustomProgress}
        >
          <OverlayLayer viewport={viewport} />
        </Viewer.Dicom>
      </Box>
      <Box w={900}>
        <CodeBlock code={CODE} />
      </Box>
    </Box>
  )
}

export default Overlay
