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
          hflip/vflip: <span className="hflip">{`${hflip}`}</span> /{' '}
          <span className="vflip">{`${vflip}`}</span>
        </ListItem>
        <ListItem>
          translation: <span className="x">{x?.toFixed(2)}</span> /{' '}
          <span className="y">{y?.toFixed(2)}</span>
        </ListItem>
        <ListItem>
          invert: <span className="invert">{`${invert}`}</span>
        </ListItem>
        <ListItem>
          WW / WC:{' '}
          <span className="windowWidth">{windowWidth?.toFixed(2)}</span> /{' '}
          <span className="windowCenter">{windowCenter?.toFixed(2)}</span>
        </ListItem>
      </UnorderedList>
    </Box>
  )
}
