import { useRef } from 'react'
import { Box, UnorderedList, ListItem } from '@chakra-ui/react'
import { useViewport } from '@lunit/insight-viewer'

const style: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
}

export default function Overlay(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const {
    scale,
    invert,
    hflip,
    vflip,
    x,
    y,
    windowWidth,
    windowCenter,
  } = useViewport()

  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      w="100%"
      h="100%"
      p="4"
      bg="rgba(255, 255, 255, .3)"
      color="blue.200"
      textShadow="1px 1px 1px black"
    >
      <UnorderedList>
        <ListItem>scale: {scale}</ListItem>
        <ListItem>
          hflip/vflip: {`${hflip}`} / {`${vflip}`}
        </ListItem>
        <ListItem>
          translation: {x} / {y}
        </ListItem>
        <ListItem>invert: {`${invert}`}</ListItem>
        <ListItem>
          voi: {windowWidth} / {windowCenter}
        </ListItem>
      </UnorderedList>
      <canvas ref={canvasRef} style={style} />
    </Box>
  )
}
