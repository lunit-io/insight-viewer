import { Box } from '@chakra-ui/react'
import Viewer from '@lunit/insight-viewer'
import useImageSelect from './useImageSelect'
import CustomProgress from '../../components/CustomProgress'

export default function ImageSelectableViewer(): JSX.Element {
  const { ImageSelect, selected } = useImageSelect()

  return (
    <>
      <Box mb={6}>
        <ImageSelect />
      </Box>

      <div style={{ maxWidth: '100%', aspectRatio: '1 / 1' }}>
        <Viewer.Dicom imageId={selected} Progress={CustomProgress} />
      </div>
    </>
  )
}
