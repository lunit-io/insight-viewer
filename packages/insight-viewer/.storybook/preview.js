import { addParameters } from '@storybook/react'
import { ChakraProvider } from '@chakra-ui/react'
import { addDecorator } from '@storybook/react'

export const Chakra = ({ children }) => (
  <ChakraProvider>
    {children}
  </ChakraProvider>
)

addParameters({ docs: { page: null } })
addDecorator(StoryFn =>
  <Chakra>
    <StoryFn />
  </Chakra>)
