import { Box, RadioGroup, Radio, Stack, HStack } from '@chakra-ui/react'
import { Interaction, SetInteraction } from '@lunit/insight-viewer'

export default function Control({
  setInteraction,
}: {
  setInteraction: SetInteraction
}): JSX.Element {
  function handleChange(type: string) {
    return (value: string) => {
      setInteraction((prev: Interaction) => ({
        ...prev,
        [type]: value === 'none' ? undefined : value,
      }))
    }
  }

  return (
    <Box mb={6}>
      <HStack spacing="80px">
        <Box>
          <Box>Primary Drag</Box>
          <RadioGroup
            defaultValue="none"
            onChange={handleChange('primaryDrag')}
          >
            <Stack direction="row">
              <Radio value="none">none</Radio>
              <Radio value="pan">pan</Radio>
              <Radio value="adjust">adjust</Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <Box>
          <Box>Secondary Drag</Box>
          <RadioGroup
            defaultValue="none"
            onChange={handleChange('secondaryDrag')}
          >
            <Stack direction="row">
              <Radio value="none">none</Radio>
              <Radio value="pan">pan</Radio>
              <Radio value="adjust">adjust</Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </HStack>
    </Box>
  )
}
