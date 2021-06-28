import { Box, RadioGroup, Radio, Stack, HStack } from '@chakra-ui/react'
import { Drag } from '@lunit/insight-viewer'

export default function Control({
  onChange,
}: {
  onChange: (type: string) => (value: Drag | 'none') => void
}): JSX.Element {
  return (
    <Box mb={6}>
      <HStack spacing="80px">
        <Box>
          <Box>Primary Drag</Box>
          <RadioGroup defaultValue="none" onChange={onChange('primaryDrag')}>
            <Stack direction="row">
              <Radio value="none">none</Radio>
              <Radio value="pan">pan</Radio>
              <Radio value="adjust">adjust</Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <Box>
          <Box>Secondary Drag</Box>
          <RadioGroup defaultValue="none" onChange={onChange('secondaryDrag')}>
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
