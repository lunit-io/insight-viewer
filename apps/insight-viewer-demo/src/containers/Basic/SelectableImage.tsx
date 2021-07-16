import { Box } from '@chakra-ui/react'
import Viewer from '@lunit/insight-viewer'
import useImageSelect from './useImageSelect'
import CustomProgress from '../../components/CustomProgress'
import useIsMount from '../../hooks/useIsMount'

export default function SelectableImage(): JSX.Element {
  const { ImageSelect, selected } = useImageSelect()
  const isMount = useIsMount()

  return (
    <>
      <Box mb={6}>
        <ImageSelect />
      </Box>

      <div
        style={{ maxWidth: '100%', aspectRatio: '1 / 1' }}
        className={isMount ? 'is-mount' : ''}
      >
        <Viewer.Dicom imageId={selected} Progress={CustomProgress} />
      </div>
    </>
  )
}
