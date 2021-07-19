import { Button, Flex } from '@chakra-ui/react'

const LineStyle = {
  width: '20px',
  height: '2px',
  marginBottom: '5px',
  backgroundColor: '#4A5568',
} as const

export function HamburgerButton(): JSX.Element {
  return (
    <Button variant="unstyled">
      <Flex align="center" justify="center" direction="column">
        <div style={LineStyle} />
        <div style={LineStyle} />
        <div style={LineStyle} />
      </Flex>
    </Button>
  )
}
