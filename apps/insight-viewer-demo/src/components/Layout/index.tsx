import { Flex, Heading, Box, Grid, GridItem, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Logo } from '../Logo'
import Nav from '../Nav'
import { NextChakraLink } from '../NextChakraLink'
import config from '../../../config'
import { WithChildren } from '../../types'

export default function Layout({ children }: WithChildren): JSX.Element {
  const router = useRouter()

  return (
    <Flex
      w="100%"
      h="100%"
      px="10"
      justify="space-between"
      flexDirection="column"
    >
      <header>
        <Box p="6">
          <Grid templateColumns="repeat(5, 1fr)">
            <GridItem colSpan={1}>
              <NextChakraLink href={`${config.HOST}/basic`}>
                <Logo h="1.5rem" pointerEvents="none" />
              </NextChakraLink>
            </GridItem>
            <GridItem colSpan={4}>
              <HStack>
                <Heading as="h1" size="md">
                  @lunit/insight-viewer-demo /
                </Heading>
                <Heading as="h2">{router.pathname.slice(1)}</Heading>
              </HStack>
            </GridItem>
          </Grid>
        </Box>
      </header>
      <Box p="6">
        <Grid templateColumns="repeat(5, 1fr)">
          <GridItem colSpan={1}>
            <Nav />
          </GridItem>
          <GridItem colSpan={4}>{children}</GridItem>
        </Grid>
      </Box>
    </Flex>
  )
}
