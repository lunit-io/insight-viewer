import { Box, Heading, Stack, Switch } from '@chakra-ui/react'
import useInsightViewer from '@lunit/insight-viewer'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'

function Viewport(): JSX.Element {
  const { DICOMImageViewer } = useInsightViewer()

  return (
    <>
      <Box mb={6}>
        <Heading as="h3">Viewport</Heading>
      </Box>

      <Box w={700}>
        <Stack>
          <Box mb={6}>
            Invert <Switch onChange={() => console.log('switch')} />
          </Box>
        </Stack>
        <Box w={500} h={500}>
          <DICOMImageViewer imageId={IMAGE_ID} />
        </Box>
      </Box>
    </>
  )
}

export default Viewport
