/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Heading } from '@chakra-ui/react'
import useInsightViewer from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'

function customError(e: Error): void {
  alert(`!!! ${e.message}`)
}

const code = `\
import useInsightViewer from '@lunit/insight-viewer'

const { DICOMImageViewer } = useInsightViewer({
  onError: customError,
})

export default function() {
  return <DICOMImageViewer imageId={IMAGE_ID} />
}
`

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
      <Box w={700}>
        <CodeBlock code={code} />
      </Box>
    </>
  )
}
