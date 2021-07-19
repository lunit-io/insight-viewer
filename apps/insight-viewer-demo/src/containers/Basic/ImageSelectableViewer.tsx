import { Box } from '@chakra-ui/react'
import Viewer from '@lunit/insight-viewer'
import useImageSelect from './useImageSelect'
import CustomProgress from '../../components/CustomProgress'
import { ViewerWrapper } from '../../components/Wrapper'

export default function ImageSelectableViewer(): JSX.Element {
  const { ImageSelect, selected } = useImageSelect()

  return (
    <>
      <Box mb={6}>
        <ImageSelect />
      </Box>

      <ViewerWrapper>
        <Viewer.Dicom imageId={selected} Progress={CustomProgress} />
      </ViewerWrapper>
    </>
  )
}
