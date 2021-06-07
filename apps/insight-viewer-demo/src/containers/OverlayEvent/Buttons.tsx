import { useContext } from 'react'
import { Stack, Button } from '@chakra-ui/react'
import { SetViewport } from '@lunit/insight-viewer'
import Context, { EVENT_TYPE } from './Context'

export default function Buttons({
  setViewport,
}: {
  setViewport: SetViewport
}): JSX.Element {
  const { eventType, setEventType } = useContext(Context)

  return (
    <Stack spacing={4} direction="row">
      <Button
        colorScheme="blue"
        onClick={() => {
          setViewport({ mouseDown: undefined })
          setEventType(EVENT_TYPE.draw)
        }}
        isActive={eventType === EVENT_TYPE.draw}
      >
        draw
      </Button>
      <Button
        colorScheme="blue"
        onClick={() => {
          setViewport({ mouseDown: 'pan' })
          setEventType(EVENT_TYPE.pan)
        }}
        isActive={eventType === EVENT_TYPE.pan}
      >
        pan
      </Button>
    </Stack>
  )
}
