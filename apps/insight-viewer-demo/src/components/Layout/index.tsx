import { ReactNode, FC } from 'react'
import Head from 'next/head'
import { Container, Flex, Heading, HStack } from '@chakra-ui/react'
import { Logo } from '../Logo'

type Props = {
  children?: ReactNode
  title?: string
}

export const Layout: FC<Props> = ({
  children,
  title = 'This is the default title',
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Container maxWidth="1200px">
      <header>
        <Flex py={4} justifyContent="space-between" alignItems="center" mb={8}>
          <Flex justifyContent="space-between" alignItems="center">
            <nav>
              <HStack spacing={12}>
                <Logo h="1.5rem" pointerEvents="none" />
                <Heading size="lg">@lunit/insight-viewer demo</Heading>
              </HStack>
            </nav>
          </Flex>
        </Flex>
      </header>
      {children}
    </Container>
  </div>
)
