import { useState } from 'react'
import { Box, Text } from '@chakra-ui/react'
import Viewer, { ViewerError } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import { CUSTOM_CODE } from './Code'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT0000100.dcm'

export default function Custom(): JSX.Element {
  const [error, setError] = useState('')

  function customError(e: ViewerError): void {
    setError(`!!! ${e.message} ${e.status}`)
  }

  return (
    <>
      <Box mb={6}>
        <Viewer.Dicom imageId={IMAGE_ID} onError={customError} />
      </Box>
      <Text>{error}</Text>
      <Box w={800}>
        <CodeBlock code={CUSTOM_CODE} />
      </Box>
    </>
  )
}
