import { Box } from '@chakra-ui/react'
import InsightViewer, { ViewerError, useImage } from '@lunit/insight-viewer'
import { WRONG_IMAGE } from '@insight-viewer-library/fixtures'
import CodeBlock from '../../components/CodeBlock'
import { ViewerWrapper } from '../../components/Wrapper'
import { CUSTOM_CODE } from './Code'
import { CODE_SANDBOX } from '../../const'

const IMAGE_ID = WRONG_IMAGE

function customError(e: ViewerError) {
  // eslint-disable-next-line no-alert
  alert(`error ${e.message} ${e.status}`)
}

export default function Custom(): JSX.Element {
  const { image } = useImage({
    wadouri: IMAGE_ID,
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
