import { Box } from '@chakra-ui/react'
import InsightViewer, { useImage } from '@lunit/insight-viewer'
import ContourComponent from '@lunit/insight-viewer/contour'
import { ViewerWrapper } from '../../components/Wrapper'
import CodeBlock from '../../components/CodeBlock'
import { IMAGES } from '../../const'

const CODE = `\
import InsightViewer, { useImage } from '@lunit/insight-viewer'
import Contour from '@lunit/insight-viewer/contour'

export default function App() {
  const { image } = useImage({
    wadouri: IMAGE_ID,
  })
  return (
    <Wrapper>
      <InsightViewer image={image}>
        <Contour />
      </InsightViewer>
    </Wrapper>
  )
}
`

function Contour(): JSX.Element {
  const { loadingState, image } = useImage({
    wadouri: IMAGES[0],
  })

  return (
    <Box data-cy-loaded={loadingState}>
      <ViewerWrapper>
        <InsightViewer image={image}>
          <ContourComponent />
        </InsightViewer>
      </ViewerWrapper>
      <Box>
        <CodeBlock code={CODE} />
      </Box>
    </Box>
  )
}

export default Contour
