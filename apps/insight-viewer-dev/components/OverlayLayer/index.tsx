import { Box, UnorderedList, ListItem } from '@chakra-ui/react'
import { Viewport } from '@lunit/insight-viewer/viewport'

export default function OverlayLayer({
  viewport: { scale, hflip, vflip, x, y, invert, windowWidth, windowCenter, rotation },
}: {
  viewport: Viewport
}): JSX.Element {
  return (
    <Box position="absolute" top="0" left="0" w="100%" h="100%" p="4" color="blue.200" textShadow="1px 1px 1px black">
      <UnorderedList>
        <ListItem>
          scale: <span data-cy-scale>{scale.toFixed(2)}</span>
        </ListItem>
        <ListItem>
          hflip/vflip: <span data-cy-hflip>{`${hflip}`}</span> / <span data-cy-vflip>{`${vflip}`}</span>
        </ListItem>
        <ListItem>
          translation: <span data-cy-x>{x?.toFixed(2)}</span> / <span data-cy-y>{y?.toFixed(2)}</span>
        </ListItem>
        <ListItem>
          invert: <span data-cy-invert>{`${invert}`}</span>
        </ListItem>
        <ListItem>
          rotation: <span data-cy-rotation>{`${rotation}`}</span>
        </ListItem>
        <ListItem>
          WW / WC: <span data-cy-window-width>{windowWidth?.toFixed(2)}</span> /{' '}
          <span data-cy-window-center>{windowCenter?.toFixed(2)}</span>
        </ListItem>
      </UnorderedList>
    </Box>
  )
}
