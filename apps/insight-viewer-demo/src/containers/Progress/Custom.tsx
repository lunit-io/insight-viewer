import { Box, Progress } from '@chakra-ui/react'
import useInsightViewer from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'

const Code = `\
import useInsightViewer from '@lunit/insight-viewer'

const { DICOMImageViewer } = useInsightViewer({
  Progress: <CustomProgress />
})

export default function() {
  return <DICOMImageViewer imageId={IMAGE_ID} />
}
`
const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000012.dcm'

function CustomProgress({ progress }: { progress: number }): JSX.Element {
  return <Progress value={progress} margin="50px" />
}

export default function Custom(): JSX.Element {
  const { DICOMImageViewer } = useInsightViewer({
    Progress: CustomProgress,
  })

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
