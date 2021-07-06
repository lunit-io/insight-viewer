import { Box } from '@chakra-ui/react'
import Viewer from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import { BASE_CODE } from './Code'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'

export default function Base(): JSX.Element {
  return (
    <>
      <Box mb={6}>
        <Viewer.Dicom imageId={IMAGE_ID} />
      </Box>
      <Box w={700}>
        <CodeBlock code={BASE_CODE} />
      </Box>
    </>
  )
}
