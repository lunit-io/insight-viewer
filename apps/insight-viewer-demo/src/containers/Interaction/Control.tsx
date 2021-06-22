import { Box, RadioGroup, Radio, Stack } from '@chakra-ui/react'
import {
  Interaction,
  SetInteraction,
  MouseDownMove,
} from '@lunit/insight-viewer'

export default function Control({
  setInteraction,
}: {
  setInteraction: SetInteraction
}): JSX.Element {
  function handleChange(value: string) {
    const v = value as MouseDownMove | 'none'

    setInteraction((prev: Interaction) => ({
      ...prev,
      mouseDownMove: v === 'none' ? undefined : v,
    }))
  }

  return (
    <Box mb={6}>
      <RadioGroup defaultValue="none" onChange={handleChange}>
        <Stack direction="row">
          <Radio value="none">none</Radio>
          <Radio value="pan">pan</Radio>
          <Radio value="adjust">adjust</Radio>
        </Stack>
      </RadioGroup>
    </Box>
  )
}
