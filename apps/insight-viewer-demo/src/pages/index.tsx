import { FC } from 'react'
import { Box, VStack, Grid, ListItem, UnorderedList } from '@chakra-ui/react'
import { Chakra } from '../components/Chakra'
import { Layout } from '../components/Layout'
import { NextChakraLink } from '../components/NextChakraLink'

interface IndexProps {
  cookies?: string
}

const IndexPage: FC<IndexProps> = ({ cookies }) => (
  <Chakra cookies={cookies}>
    <Layout title="@lunit/insight-viewer demo">
      <Box fontSize="lg">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <UnorderedList>
              <ListItem>
                <NextChakraLink href="/" color="teal.500">
                  Lorem ipsum dolor sit amet
                </NextChakraLink>
              </ListItem>
              <ListItem>Consectetur adipiscing elit</ListItem>
              <ListItem>Integer molestie lorem at massa</ListItem>
              <ListItem>Facilisis in pretium nisl aliquet</ListItem>
            </UnorderedList>
          </VStack>
        </Grid>
      </Box>
    </Layout>
  </Chakra>
)

export default IndexPage
export { getServerSideProps } from '../components/Chakra'
