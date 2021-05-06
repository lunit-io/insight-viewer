/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Heading } from '@chakra-ui/react'
import useInsightViewer, { HTTPError } from '@lunit/insight-viewer'

function customError(e: HTTPError): void {
  alert(`!!! ${e?.error?.message}`)
}

export default function Error(): JSX.Element {
  const { DICOMImageViewer } = useInsightViewer({
    onError: customError,
  })

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
