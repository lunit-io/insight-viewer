import { Box } from '@chakra-ui/react'
import Viewer from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import CustomProgress from '../../components/CustomProgress'

const Code = `\
import Viewer from '@lunit/insight-viewer'

export default function Viewer() {
  return (
    <Viewer.Dicom 
      imageId={IMAGE_ID} 
      Progress={CustomProgress} 
    />
  )
}
`
const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000012.dcm'

export default function Custom(): JSX.Element {
  return (
    <>
      <Box mb={6}>
        <Viewer.Dicom imageId={IMAGE_ID} Progress={CustomProgress} />
      </Box>
      <Box w={700}>
        <CodeBlock code={Code} />
      </Box>
    </>
  )
}
