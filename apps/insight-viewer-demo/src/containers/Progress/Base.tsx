import { Box } from '@chakra-ui/react'
import ImageViewer, { useImage } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import { ViewerWrapper } from '../../components/Wrapper'
import { BASE_CODE } from './Code'
import { IMAGES } from '../../const'

export default function Base(): JSX.Element {
  const { image } = useImage({
    imageId: IMAGES[3],
  })

  return (
    <>
      <ViewerWrapper>
        <ImageViewer image={image} />
      </ViewerWrapper>
      <Box>
        <CodeBlock code={BASE_CODE} />
      </Box>
    </>
  )
}
