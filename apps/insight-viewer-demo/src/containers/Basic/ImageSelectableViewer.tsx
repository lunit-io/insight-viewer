import { Box } from '@chakra-ui/react'
import Viewer, { useImageLoad } from '@lunit/insight-viewer'
import useImageSelect from './useImageSelect'
import CustomProgress from '../../components/CustomProgress'
import { ViewerWrapper } from '../../components/Wrapper'

export default function ImageSelectableViewer(): JSX.Element {
  const { ImageSelect, selected } = useImageSelect()
  const { image } = useImageLoad({
    imageId: selected,
  })

  return (
    <>
      <Box mb={6}>
        <ImageSelect />
      </Box>

      <ViewerWrapper>
        <Viewer.Dicom image={image} Progress={CustomProgress} />
      </ViewerWrapper>
    </>
  )
}
