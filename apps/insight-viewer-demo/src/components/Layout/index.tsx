import { Flex, Heading, Box, Grid, GridItem } from '@chakra-ui/react'
import { Logo } from '../Logo'
import Nav from '../Nav'
import { NextChakraLink } from '../NextChakraLink'
import config from '../../../config'
import { WithChildren } from '../../types'

export default function Layout({ children }: WithChildren): JSX.Element {
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
              <NextChakraLink href={`${config.HOST}`}>
                <Logo h="1.5rem" pointerEvents="none" />
              </NextChakraLink>
            </GridItem>
            <GridItem colSpan={4}>
              <Heading as="h1" size="md">
                @lunit/insight-viewer demo
              </Heading>
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
