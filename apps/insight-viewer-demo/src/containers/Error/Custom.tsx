import { Box } from '@chakra-ui/react'
import Viewer, { ViewerError } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import { CUSTOM_CODE } from './Code'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT0000100.dcm'

function customError(e: ViewerError): void {
  // eslint-disable-next-line no-alert
  alert(`!!! ${e.message} ${e.status}`)
}

export default function Custom(): JSX.Element {
  return (
    <>
      <Box mb={6}>
        <Viewer.Dicom imageId={IMAGE_ID} onError={customError} />
      </Box>
      <Box w={800}>
        <CodeBlock code={CUSTOM_CODE} />
      </Box>
    </>
  )
}
