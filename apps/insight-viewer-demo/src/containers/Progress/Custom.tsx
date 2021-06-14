import { Box, Progress } from '@chakra-ui/react'
import { DICOMImageViewer } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'

const Code = `\
import { DICOMImageViewer } from '@lunit/insight-viewer'

export default function Viewer() {
  return (
    <DICOMImageViewer 
      imageId={IMAGE_ID} 
      Progress={CustomProgress} 
    />
  )
}
`
const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000012.dcm'

function CustomProgress({ progress }: { progress: number }): JSX.Element {
  return <Progress value={progress} margin="50px" />
}

export default function Custom(): JSX.Element {
  return (
    <>
      <Box mb={6}>
        <DICOMImageViewer imageId={IMAGE_ID} Progress={CustomProgress} />
      </Box>
      <Box w={700}>
        <CodeBlock code={Code} />
      </Box>
    </>
  )
}
