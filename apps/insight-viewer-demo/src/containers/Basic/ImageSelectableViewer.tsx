import { Box, Text } from '@chakra-ui/react'
import ImageViewer, { useImage } from '@lunit/insight-viewer'
import useImageSelect from './useImageSelect'
import CustomProgress from '../../components/CustomProgress'
import { ViewerWrapper } from '../../components/Wrapper'

export default function ImageSelectableViewer(): JSX.Element {
  const { ImageSelect, selected } = useImageSelect()
  const { loadingState, image } = useImage({
    imageId: selected,
  })

  return (
    <>
      <Box mb={6}>
        <ImageSelect />
      </Box>

      <Box mb={3}>
        <Text>
          <b data-cy-loaded={loadingState}>{loadingState}</b>
          {image && <span> ({image.imageId})</span>}
        </Text>
      </Box>

      <ViewerWrapper>
        <ImageViewer image={image} Progress={CustomProgress} />
      </ViewerWrapper>
    </>
  )
}
