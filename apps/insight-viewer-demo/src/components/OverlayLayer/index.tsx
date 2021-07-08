import { Box, UnorderedList, ListItem } from '@chakra-ui/react'
import { Viewport } from '@lunit/insight-viewer'

export default function OverlayLayer({
  viewport: { scale, hflip, vflip, x, y, invert, windowWidth, windowCenter },
}: {
  viewport: Viewport
}): JSX.Element {
  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      w="100%"
      h="100%"
      p="4"
      color="blue.200"
      textShadow="1px 1px 1px black"
    >
      <UnorderedList>
        <ListItem>
          scale: <span className="scale">{scale}</span>
        </ListItem>
        <ListItem>
          hflip/vflip: {`${hflip}`} / {`${vflip}`}
        </ListItem>
        <ListItem>
          translation: {x.toFixed(2)} / {y.toFixed(2)}
        </ListItem>
        <ListItem>invert: {`${invert}`}</ListItem>
        <ListItem>
          WW / WC: {windowWidth.toFixed(2)} / {windowCenter.toFixed(2)}
        </ListItem>
      </UnorderedList>
    </Box>
  )
}
