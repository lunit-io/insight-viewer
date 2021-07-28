import { Box, Text } from '@chakra-ui/react'
import ImageViewer, { useMultiframe, useImageLoad } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import CustomProgress from '../../components/CustomProgress'
import { ViewerWrapper } from '../../components/Wrapper'
import { CODE } from './Code'

const IMAGES = [
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000000.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000001.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000002.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000003.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000004.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000005.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000006.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000007.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000008.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000009.dcm',
  'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000010.dcm',
]

export default function Multiframe(): JSX.Element {
  const { frame } = useMultiframe(IMAGES)
  const { loadingState, image } = useImageLoad({
    imageId: IMAGES[frame],
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
        <ImageViewer image={image} Progress={CustomProgress} />
      </ViewerWrapper>
      <Box>
        <CodeBlock code={CODE} />
      </Box>
    </Box>
  )
}
