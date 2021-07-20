import { Flex, Heading, Box, HStack, Spacer } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Logo } from '../Logo'
import Nav from '../Nav'
import { NextChakraLink } from '../NextChakraLink'
import { WithChildren } from '../../types'
import { LINKS } from '../Nav/const'
import MobileNavigation from './MobileNavigation'
import useIsOneColumn from '../../hooks/useIsOneColumn'

const SIDE_WIDTH = '240px'

function ResponsiveBox({
  isOneColumnLayout,
  children,
}: WithChildren<{
  isOneColumnLayout: boolean
}>): JSX.Element {
  return <Box pt={isOneColumnLayout ? 4 : 6}>{children}</Box>
}

export default function Layout({ children }: WithChildren): JSX.Element {
  const router = useRouter()
  const isOneColumn = useIsOneColumn()
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
        <header>
          <ResponsiveBox isOneColumnLayout={isOneColumn}>
            <Flex direction={isOneColumn ? 'column' : 'row'}>
              <Flex
                width={isOneColumn ? '100%' : SIDE_WIDTH}
                pt={isOneColumn ? 0 : 2}
              >
                <NextChakraLink href="/" pt={isOneColumn ? '6px' : '2px'}>
                  <Logo h="1.5rem" pointerEvents="none" />
                </NextChakraLink>
                <Spacer />
                {isOneColumn && <MobileNavigation />}
              </Flex>
              {!isOneColumn && (
                <Box>
                  <HStack>
                    <Heading as="h1" size="md">
                      @lunit/insight-viewer-demo /
                    </Heading>
                    <Heading as="h2">{title}</Heading>
                  </HStack>
                </Box>
              )}
            </Flex>
          </ResponsiveBox>
        </header>
        <ResponsiveBox isOneColumnLayout={isOneColumn}>
          <Flex>
            {!isOneColumn && (
              <Box width={isOneColumn ? 'auto' : SIDE_WIDTH}>
                <Nav />
              </Box>
            )}
            <Box w="100%">{children}</Box>
          </Flex>
        </ResponsiveBox>
      </Flex>
    </Box>
  )
}
