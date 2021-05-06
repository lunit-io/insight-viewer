import { Box, Heading } from '@chakra-ui/react'
import useInsightViewer from '@lunit/insight-viewer'

export default function Error(): JSX.Element {
  const { DICOMImageViewer } = useInsightViewer()

  return (
    <>
      <Box mb={6}>
        <Heading as="h3">InsightViewer Error</Heading>
      </Box>
      <Box mb={6}>
        <DICOMImageViewer imageId="wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT0000100.dcm" />
      </Box>
    </>
  )
}
