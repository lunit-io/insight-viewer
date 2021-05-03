import { useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import { WithChildren } from '../../types'

export default function CodeBlock({
  code,
}: WithChildren<{
  code: string
}>): JSX.Element {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <div className="Code">
      <pre>
        <code className="language-javascript">{code}</code>
      </pre>
    </div>
  )
}
