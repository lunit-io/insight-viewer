import { Box, Heading } from '@chakra-ui/react'
import WithCookie from './WithCookie'
import WithJwt from './WithJwt'
import config from '../../../config'

function Basic(): JSX.Element {
  return (
    <>
      <Box mb={6}>
        <Heading as="h3">Http header</Heading>
      </Box>
      {config.IS_DEV && <WithCookie />}
      <WithJwt />
    </>
  )
}

export default Basic
