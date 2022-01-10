import { Box, Stack } from '@chakra-ui/react'
import CodeBlock from '../../components/CodeBlock'
import { CODE } from './Code'
import { CODE_SANDBOX } from '../../const'
import Image1 from './Image1'
import Image2 from './Image2'

export default function App(): JSX.Element {
  return (
    <Box>
      <Stack direction="row" spacing="24px">
        <Image1 />
        <Image2 />
      </Stack>

      <Box>
        <CodeBlock code={CODE} codeSandbox={CODE_SANDBOX.viewport} />
      </Box>
    </Box>
  )
}
