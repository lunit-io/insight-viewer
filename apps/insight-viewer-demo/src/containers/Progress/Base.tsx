import { Box } from '@chakra-ui/react'
import Viewer, { useImageLoad } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import { ViewerWrapper } from '../../components/Wrapper'
import { BASE_CODE } from './Code'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'

export default function Base(): JSX.Element {
  const { image } = useImageLoad({
    imageId: IMAGE_ID,
  })

  return (
    <>
      <ViewerWrapper>
        <Viewer.Dicom image={image} />
      </ViewerWrapper>
      <Box>
        <CodeBlock code={BASE_CODE} />
      </Box>
    </>
  )
}
