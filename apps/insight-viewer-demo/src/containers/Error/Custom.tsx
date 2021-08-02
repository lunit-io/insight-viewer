import { useState, useCallback } from 'react'
import { Box, Text } from '@chakra-ui/react'
import ImageViewer, { ViewerError, useImage } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import { ViewerWrapper } from '../../components/Wrapper'
import { CUSTOM_CODE } from './Code'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT0000100.dcm'

export default function Custom(): JSX.Element {
  const [error, setError] = useState('')

  const customError = useCallback((e: ViewerError) => {
    setError(`!!! ${e.message} ${e.status}`)
  }, [])

  const { image } = useImage({
    imageId: IMAGE_ID,
    onError: customError,
  })

  return (
    <>
      <ViewerWrapper>
        <ImageViewer image={image} />
      </ViewerWrapper>
      <Text>{error}</Text>
      <Box>
        <CodeBlock code={CUSTOM_CODE} />
      </Box>
    </>
  )
}
