import { Box, Heading } from '@chakra-ui/react'
import WithCookie from './WithCookie'
import WithJwt from './WithJwt'

function Basic(): JSX.Element {
  return (
    <>
      <Box mb={6}>
        <Heading as="h3">Http header</Heading>
      </Box>
      <WithCookie />
      <WithJwt />
    </>
  )
}

export default Basic
