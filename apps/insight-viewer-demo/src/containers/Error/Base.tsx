import { Box, Text } from '@chakra-ui/react'
import Viewer from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import { BASE_CODE } from './Code'

export default function Base(): JSX.Element {
  return (
    <>
      <Box mb={3}>
        <Text>Chrome Dev Console에서 error 표시</Text>
      </Box>
      <Box mb={6}>
        <Viewer.Dicom imageId="wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT0000100.dcm" />
      </Box>
      <Box w={700}>
        <CodeBlock code={BASE_CODE} />
      </Box>
    </>
  )
}
