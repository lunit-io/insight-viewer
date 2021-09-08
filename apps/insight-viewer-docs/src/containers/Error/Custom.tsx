import { useCallback } from 'react'
import { Box } from '@chakra-ui/react'
import InsightViewer, { ViewerError, useImage } from '@lunit/insight-viewer'
import CodeBlock from '../../components/CodeBlock'
import { ViewerWrapper } from '../../components/Wrapper'
import { CUSTOM_CODE } from './Code'
import { WRONG_IMAGE, CODE_SANDBOX } from '../../const'

const IMAGE_ID = WRONG_IMAGE

export default function Custom(): JSX.Element {
  const customError = useCallback((e: ViewerError) => {
    // eslint-disable-next-line no-alert
    alert(`error ${e.status}`)
  }, [])

  const { image } = useImage({
    imageId: IMAGE_ID,
    onError: customError,
  })

  return (
    <>
      <ViewerWrapper>
        <InsightViewer image={image} />
      </ViewerWrapper>

      <Box>
        <CodeBlock code={CUSTOM_CODE} codeSandbox={CODE_SANDBOX.error} />
      </Box>
    </>
  )
}
