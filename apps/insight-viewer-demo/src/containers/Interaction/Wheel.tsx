import { Box, Text } from '@chakra-ui/react'
import Viewer, { useMultiframe } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'

const IMAGES = [
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000000.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000001.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000002.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000003.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000004.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000005.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000006.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000007.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000008.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000009.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000010.dcm',
]

const Code = `\
  import Viewer, { useMultiframe } from '@lunit/insight-viewer'

  export default function App(): JSX.Element {
    const { image, frame, setFrame } = useMultiframe(IMAGES)
  
    return (
      <>
        <Text>frame: {frame}</Text>
        <Viewer.Dicom imageId={image} onFrameChange={setFrame} />
      </>
    )
  }
`

export default function App(): JSX.Element {
  const { image, frame, setFrame } = useMultiframe(IMAGES)

  return (
    <Box w={700}>
      <Box mb={6}>
        <Text>frame: {frame}</Text>
      </Box>
      <Box w={500} h={500}>
        <Viewer.Dicom imageId={image} onFrameChange={setFrame} />
      </Box>
      <Box w={900}>
        <CodeBlock code={Code} />
      </Box>
    </Box>
  )
}
