import { ChakraProvider, localStorageManager } from '@chakra-ui/react'
import { GetServerSidePropsContext } from 'next'
import { ReactNode, FC } from 'react'

interface ChakraProps {
  cookies?: string
  children: ReactNode
}

export const Chakra: FC<ChakraProps> = ({ children }) => (
  <ChakraProvider colorModeManager={localStorageManager}>
    {children}
  </ChakraProvider>
)

export type ServerSideProps<T> = { props: T } | Promise<{ props: T }>

export function getServerSideProps({
  req,
}: GetServerSidePropsContext): ServerSideProps<{ cookies?: string }> {
  return {
    props: {
      cookies: req.headers.cookie ?? '',
    },
  }
}
