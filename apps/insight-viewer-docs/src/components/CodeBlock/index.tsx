import { useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import { WithChildren } from '../../types'
import config from '../../../config'

export default function CodeBlock({
  code,
}: WithChildren<{
  code: string
}>): JSX.Element {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <Box className="Code" display={config.IS_CYPRESS ? 'none' : 'block'}>
      <pre>
        <code className="language-javascript">{code}</code>
      </pre>
    </Box>
  )
}
