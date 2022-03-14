import { Stack } from '@chakra-ui/react'

import Image1 from './Image1'
import Image2 from './Image2'

export default function SingleFrame(): JSX.Element {
  return (
    <Stack direction="row" spacing="24px">
      <Image1 />
      <Image2 />
    </Stack>
  )
}
