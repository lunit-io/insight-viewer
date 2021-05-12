import { Box, Text } from '@chakra-ui/react'
import useInsightViewer from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'

const code = `\
import useInsightViewer from '@lunit/insight-viewer'

const { DICOMImageViewer } = useInsightViewer()

export default function() {
  return <DICOMImageViewer imageId={IMAGE_ID} />
}
`

export default function Base(): JSX.Element {
  const { DICOMImageViewer } = useInsightViewer()

  return (
    <>
      <Box mb={3}>
        <Text>Chrome Dev Console에서 error 표시</Text>
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
