import { Box, Text } from '@chakra-ui/react'
import Viewer, { useImageLoad } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import CustomProgress from '../../components/CustomProgress'
import { ViewerWrapper } from '../../components/Wrapper'
import { CODE } from './Code'

const IMAGE_ID =
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000011.dcm'

export default function Base(): JSX.Element {
  const { loadingState, image } = useImageLoad({
    imageId: IMAGE_ID,
  })

  return (
    <Box>
      <Box mb={6}>
        <Text className="test">
          loadingState:{' '}
          <span data-cy-loading-state="loading-state">{loadingState}</span>
          {image && <span> ({image.imageId})</span>}
        </Text>
      </Box>
      <ViewerWrapper>
        <Viewer.Dicom image={image} Progress={CustomProgress} />
      </ViewerWrapper>
      <Box>
        <CodeBlock code={CODE} />
      </Box>
    </Box>
  )
}
