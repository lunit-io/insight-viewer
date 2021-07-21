import { useState } from 'react'
import { Box, Text } from '@chakra-ui/react'
import Viewer, { ViewerError } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import { ViewerWrapper } from '../../components/Wrapper'
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
      <ViewerWrapper>
        <Viewer.Dicom imageId={IMAGE_ID} onError={customError} />
      </ViewerWrapper>
      <Text>{error}</Text>
      <Box>
        <CodeBlock code={CUSTOM_CODE} />
      </Box>
    </>
  )
}
