import { ReactNode, FC } from 'react'
import { Flex, Heading, HStack, Box } from '@chakra-ui/react'
import { Logo } from '../Logo'
import Nav from '../Nav'
import { NextChakraLink } from '../NextChakraLink'

type Props = {
  children?: ReactNode
  title?: string
}

export const Layout: FC<Props> = ({ children }) => (
  <div>
    <Flex
      w="100%"
      h="100%"
      px="6"
      justify="space-between"
      flexDirection="column"
    >
      <header>
        <Flex w="100%">
          <Box p="4">
            <HStack spacing={12}>
              <NextChakraLink href="/">
                <Logo h="1.5rem" pointerEvents="none" />
              </NextChakraLink>
              <Heading size="md">@lunit/insight-viewer demo</Heading>
            </HStack>
          </Box>
        </Flex>
      </header>
      <Flex w="100%" h="100%">
        <Nav />
        <Box flex="1" p="12" align="flex-start">
          {children}
        </Box>
      </Flex>
    </Flex>
  </div>
)
