import { Flex, Heading, Box, HStack, Spacer } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Logo } from '../Logo'
import Nav from '../Nav'
import { NextChakraLink } from '../NextChakraLink'
import { WithChildren } from '../../types'
import { LINKS } from '../Nav/const'

const SIDE_WIDTH = '240px'

export default function Layout({ children }: WithChildren): JSX.Element {
  const router = useRouter()
  const title = LINKS.filter(
    link => link.href === router.pathname.slice(1)
  )?.[0]?.name

  return (
    <Box maxW="1440px" m="0 auto">
      <Flex
        w="100%"
        h="100%"
        px="10"
        justify="space-between"
        flexDirection="column"
      >
        <Box pt={6}>
          <header>
            <Flex direction="row">
              <Flex width={SIDE_WIDTH} pt={2}>
                <NextChakraLink href="/" pt="2px">
                  <Logo h="1.5rem" pointerEvents="none" />
                </NextChakraLink>
                <Spacer />
              </Flex>
              <Box>
                <HStack>
                  <Heading as="h1" size="md">
                    @lunit/insight-viewer-docs /
                  </Heading>
                  <Heading as="h2">{title}</Heading>
                </HStack>
              </Box>
            </Flex>
          </header>
        </Box>

        <Box pt={6}>
          <Flex>
            <Box width={SIDE_WIDTH}>
              <Nav />
            </Box>
            <Box w="100%">{children}</Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
