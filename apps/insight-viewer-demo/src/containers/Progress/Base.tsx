import { Box } from '@chakra-ui/react'
import useInsightViewer from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'

const Code = `\
import useInsightViewer from '@lunit/insight-viewer'

export default function Viewer() {
  const { DICOMImageViewer } = useInsightViewer()

  return <DICOMImageViewer imageId={IMAGE_ID} />
}
`

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'

export default function Base(): JSX.Element {
  const { DICOMImageViewer } = useInsightViewer()

  return (
    <>
      <Box mb={6}>
        <DICOMImageViewer imageId={IMAGE_ID} />
      </Box>
      <Box w={700}>
        <CodeBlock code={Code} />
      </Box>
    </>
  )
}
