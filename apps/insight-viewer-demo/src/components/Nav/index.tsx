import { Box } from '@chakra-ui/react'
import { NextChakraLink } from '../NextChakraLink'
import { WithoutProp } from '../../types'
import config from '../../../config'

const Nav: WithoutProp = () => (
  <>
    <Box
      as="nav"
      aria-label="Main Navigation"
      pos="sticky"
      sx={{
        overscrollBehavior: 'contain',
      }}
      top="0"
      w="280px"
      h="calc(((100vh - 1.5rem) - 64px) - 42px);"
      pr="8"
      pb="6"
      pl="3"
      pt="12"
      overflowY="auto"
      className="sidebar-content"
      flexShrink={0}
      display={{ base: 'none', md: 'block' }}
    >
      <NextChakraLink href={`${config.HOST}/basic`} color="cyan.600">
        - Basic
      </NextChakraLink>
    </Box>
  </>
)
export default Nav
