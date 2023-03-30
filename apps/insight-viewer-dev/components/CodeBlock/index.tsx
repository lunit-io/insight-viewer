import { useEffect } from 'react'
import { Box, Button, HStack, Link } from '@chakra-ui/react'
import Prism from 'prismjs'
import { WithChildren } from '../../types'
import config from '../../config'

export default function CodeBlock({
  code,
  codeSandbox,
}: WithChildren<{
  code: string
  codeSandbox?: string
}>): JSX.Element {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(code)
  }
  return (
    <Box position="relative" display={config.IS_CYPRESS ? 'none' : 'block'}>
      <pre>
        <code className="language-javascript">{code}</code>
      </pre>
      <HStack position="absolute" top="3" right="3">
        {navigator.clipboard && (
          <Button colorScheme="blue" size="xs" onClick={copyCodeToClipboard}>
            COPY
          </Button>
        )}
        {codeSandbox && (
          <Link href={codeSandbox} isExternal>
            <Button size="xs">CODESANDBOX</Button>
          </Link>
        )}
      </HStack>
    </Box>
  )
}
