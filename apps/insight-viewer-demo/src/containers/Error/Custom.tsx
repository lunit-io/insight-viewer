import { Box } from '@chakra-ui/react'
import useInsightViewer from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'

const code = `\
import useInsightViewer from '@lunit/insight-viewer'

const { DICOMImageViewer } = useInsightViewer({
  onError: (e: Error) => alert(e.message),
})

export default function() {
  return <DICOMImageViewer imageId={IMAGE_ID} />
}
`

function customError(e: Error): void {
  // eslint-disable-next-line no-alert
  alert(`!!! ${e.message}`)
}

export default function Custom(): JSX.Element {
  const { DICOMImageViewer } = useInsightViewer({
    onError: customError,
  })

  return (
    <>
      <Box mb={6}>
        <DICOMImageViewer imageId="wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT0000100.dcm" />
      </Box>
      <Box w={700}>
        <CodeBlock code={code} />
      </Box>
    </>
  )
}
