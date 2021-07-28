import { Box, Text } from '@chakra-ui/react'
import ImageViewer, { useImageLoad } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import { ViewerWrapper } from '../../components/Wrapper'
import { BASE_CODE } from './Code'

export default function Base(): JSX.Element {
  const { image } = useImageLoad({
    imageId:
      'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT0000100.dcm',
  })

  return (
    <>
      <Box mb={3}>
        <Text>Chrome Dev Console에서 error 표시</Text>
      </Box>
      <ViewerWrapper>
        <ImageViewer image={image} />
      </ViewerWrapper>
      <Box>
        <CodeBlock code={BASE_CODE} />
      </Box>
    </>
  )
}
