import { Box, UnorderedList, ListItem } from '@chakra-ui/react'
import { useViewport } from '@lunit/insight-viewer'
import Canvas from './Canvas'

export default function Overlay(): JSX.Element {
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
      <Canvas />
    </Box>
  )
}
