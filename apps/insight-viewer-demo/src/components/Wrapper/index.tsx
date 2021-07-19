import { Box } from '@chakra-ui/react'
import { WithChildren } from '../../types'
import useIsOneColumn from '../../hooks/useIsOneColumn'

const FLEXIBLE_WIDTH = { maxWidth: '100%', width: '100%', aspectRatio: '1 / 1' }

export function ViewerWrapper({
  children,
  flexible = false,
}: WithChildren<{ flexible?: boolean }>): JSX.Element {
  const isOneColumn = useIsOneColumn()

  if (flexible || isOneColumn)
    return <div style={FLEXIBLE_WIDTH}>{children}</div>

  return (
    <Box w={500} h={500}>
      {children}
    </Box>
  )
}
