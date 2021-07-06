import { Box } from '@chakra-ui/react'
import Viewer, {
  useInteraction,
  useViewport,
  Interaction,
} from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import Control from './Control'
import OverlayLayer from '../../components/OverlayLayer'
import CustomProgress from '../../components/CustomProgress'
import { BASE_CODE } from './Code'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'

export default function App(): JSX.Element {
  const { interaction, setInteraction } = useInteraction()
  const { viewport, setViewport } = useViewport()

  function handleChange(type: string) {
    return (value: string) => {
      setInteraction((prev: Interaction) => ({
        ...prev,
        [type]: value === 'none' ? undefined : value,
      }))
    }
  }

  return (
    <Box w={700}>
      <Control onChange={handleChange} />
      <Box w={500} h={500}>
        <Viewer.Dicom
          imageId={IMAGE_ID}
          interaction={interaction}
          viewport={viewport}
          onViewportChange={setViewport}
          Progress={CustomProgress}
        >
          <OverlayLayer viewport={viewport} />
        </Viewer.Dicom>
      </Box>
      <Box w={900}>
        <CodeBlock code={BASE_CODE} />
      </Box>
    </Box>
  )
}
