import { Box, RadioGroup, Radio, Stack, HStack } from '@chakra-ui/react'

export default function Wheel({
  onChange,
}: {
  onChange: (value: 'frame' | 'zoom' | 'none') => void
}): JSX.Element {
  return (
    <Box mb={6}>
      <HStack spacing="80px">
        <Box w={200}>
          <Box>Mouse Wheel</Box>
          <RadioGroup defaultValue="none" onChange={onChange}>
            <Stack direction="row">
              <Radio value="none" className="mousewheel-none">
                none
              </Radio>
              <Radio value="frame" className="mousewheel-frame">
                frame
              </Radio>
              <Radio value="zoom" className="mousewheel-zoom">
                zoom
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </HStack>
    </Box>
  )
}
