import { useMediaQuery } from '@chakra-ui/react'

const BREAK_POINT = '(max-width: 768px)'

export default function useIsOneColumn(): boolean {
  const [isOneColumn] = useMediaQuery(BREAK_POINT)
  return isOneColumn
}
