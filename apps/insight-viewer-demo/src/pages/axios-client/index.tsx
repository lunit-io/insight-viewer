import { useState } from 'react'
import { Box, Button, Grid, GridItem } from '@chakra-ui/react'
import AxiosClient from '@lunit/axios-client'
import config from '../../../config'
import { Model } from '../../mocks/apis'
import CodeBlock from '../../components/CodeBlock'

const axiosClient = new AxiosClient({
  baseURL: `${config.HOST}`,
})

const code = `\
import AxiosClient from '@lunit/axios-client'

const axiosClient = new AxiosClient({
  baseURL: 'baseURL',
})

async function handleSuccess(): Promise<void> {
  const { data, error } = await axiosClient.request<{
    username: string
  }>(
    'GET', 
    '/api/success', 
    { params: { username: 'lunit' } }
  )
}
`

export default function Test(): JSX.Element {
  const [{ username, errorMessage }, setState] = useState({
    username: '',
    errorMessage: '',
  })

  async function handleSuccess(): Promise<void> {
    const { data } = await axiosClient.request<Model>(
      'GET',
      process.env.NODE_ENV !== 'production'
        ? '/api/success'
        : 'https://jsonplaceholder.typicode.com/users/1',
      {
        params: {
          username: 'lunit',
        },
      }
    )

    setState(prev => ({
      ...prev,
      username: data?.username ?? '',
    }))
  }

  async function handleError(): Promise<void> {
    const { error } = await axiosClient.request<Model>(
      'POST',
      process.env.NODE_ENV !== 'production'
        ? '/api/error/503'
        : 'https://mock.codes/503',
      {
        data: {
          username: 'lunit',
        },
      }
    )

    setState(prev => ({
      ...prev,
      errorMessage: `${error?.message}`,
    }))
  }

  return (
    <div>
      <Box w={900} mb={6}>
        <CodeBlock code={code} />
      </Box>
      <Box mb={6}>
        <Grid templateColumns="repeat(12, 1fr)">
          <GridItem colSpan={1}>
            <Button colorScheme="blue" onClick={handleSuccess}>
              200 OK
            </Button>
          </GridItem>
          <GridItem colSpan={11}>
            <Box w={300} p={6} bg="blue.50" borderWidth="1px">
              username: {username}
            </Box>
          </GridItem>
        </Grid>
      </Box>
      <Box mb={6}>
        <Grid templateColumns="repeat(12, 1fr)">
          <GridItem colSpan={1}>
            <Button colorScheme="blue" onClick={handleError}>
              error
            </Button>
          </GridItem>
          <GridItem colSpan={11}>
            <Box w={300} p={6} bg="red.50" borderWidth="1px">
              error: {errorMessage}
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </div>
  )
}
