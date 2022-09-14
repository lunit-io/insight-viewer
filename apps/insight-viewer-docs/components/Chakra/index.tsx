import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode, FC } from 'react'

interface ChakraProps {
  cookies?: string
  children: ReactNode
}

export const Chakra: FC<ChakraProps> = ({ children }) => <ChakraProvider>{children}</ChakraProvider>
