import { Box, Heading, HStack, Switch } from '@chakra-ui/react'
import useInsightViewer from '@lunit/insight-viewer'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'

function Viewport(): JSX.Element {
  const { DICOMImageViewer, useViewport } = useInsightViewer()
  const { invert, hflip, vflip, setViewport } = useViewport()

  return (
    <>
      <Box mb={6}>
        <Heading as="h3">Viewport</Heading>
      </Box>

      <Box w={700}>
        <Box mb={6}>
          <HStack spacing="24px">
            <Box>
              Invert <Switch onChange={() => setViewport('invert', !invert)} />
            </Box>
            <Box>
              Hflip <Switch onChange={() => setViewport('hflip', !hflip)} />
            </Box>
            <Box>
              vflip <Switch onChange={() => setViewport('vflip', !vflip)} />
            </Box>
          </HStack>
        </Box>
        <Box w={500} h={500}>
          <DICOMImageViewer
            imageId={IMAGE_ID}
            invert={invert}
            hflip={hflip}
            vflip={vflip}
          />
        </Box>
      </Box>
    </>
  )
}

export default Viewport
