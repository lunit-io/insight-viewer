import { Box, Heading } from '@chakra-ui/react'
import Tabs from './Tabs'

export default function Error(): JSX.Element {
  return (
    <>
      <Box mb={6}>
        <Heading as="h3">InsightViewer Error</Heading>
      </Box>
      <Box mb={6}>
        <Tabs />
      </Box>
    </>
  )
}
