import { Box } from '@chakra-ui/react'
import { WithChildren } from '../../types'

export function ViewerWrapper({
  children,
  className,
}: WithChildren<{ flexible?: boolean; className?: string }>): JSX.Element {
  return (
    <Box style={{ display: 'flex', justifyContent: 'center' }} bg="black" w="100%">
      <Box w={500} h={500} className={className ?? ''}>
        {children}
      </Box>
    </Box>
  )
}
