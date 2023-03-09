import { Box } from '@chakra-ui/react'
import AnnotaionOverlay from '.'

export default function CombinedOverlay(): JSX.Element {
  return (
    <Box mb={6}>
      <AnnotaionOverlay />
    </Box>
  )
}
