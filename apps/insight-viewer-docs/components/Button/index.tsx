import { Button, Flex } from '@chakra-ui/react'

const LineStyle = {
  width: '20px',
  height: '2px',
  marginBottom: '5px',
  backgroundColor: '#4A5568',
} as const

export function HamburgerButton({ onClick }: { onClick: React.MouseEventHandler<HTMLButtonElement> }): JSX.Element {
  return (
    <Button variant="unstyled" onClick={onClick} zIndex={20}>
      <Flex align="center" justify="center" direction="column">
        <div style={LineStyle} />
        <div style={LineStyle} />
        <div style={LineStyle} />
      </Flex>
    </Button>
  )
}
