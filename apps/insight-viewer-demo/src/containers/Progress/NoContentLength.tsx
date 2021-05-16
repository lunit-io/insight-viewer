import { Box } from '@chakra-ui/react'
import useInsightViewer from '@lunit/insight-viewer'

export default function NoContentLength(): JSX.Element {
  const { DICOMImageViewer } = useInsightViewer()

  return (
    <>
      <Box mb={6}>
        <DICOMImageViewer imageId="wadouri:/api/no-content-length" />
      </Box>
    </>
  )
}
