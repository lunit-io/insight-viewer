import { Box, Stack } from '@chakra-ui/react'
import InsightViewer, { useImage, useMultipleImages, useFrame } from '@lunit/insight-viewer'
import CustomProgress from '../../components/CustomProgress'
import { ViewerWrapper } from '../../components/Wrapper'

const IMAGE_ID = 'wadouri:/msw/no-content-length/1'

const IMAGES = [
  'wadouri:/msw/no-content-length/2',
  'wadouri:/msw/no-content-length/3',
  'wadouri:/msw/no-content-length/4',
]

export default function Custom(): JSX.Element {
  const { image } = useImage({
    wadouri: IMAGE_ID,
  })
  const { images } = useMultipleImages({
    wadouri: IMAGES,
  })
  const { frame } = useFrame({
    initial: 0,
    max: images.length - 1,
  })

  return (
    <Box>
      <Stack direction="row" spacing="24px">
        <ViewerWrapper>
          <InsightViewer image={image} Progress={CustomProgress} />
        </ViewerWrapper>
        <ViewerWrapper>
          <InsightViewer image={images[frame]} Progress={CustomProgress} />
        </ViewerWrapper>
        å
      </Stack>
    </Box>
  )
}
