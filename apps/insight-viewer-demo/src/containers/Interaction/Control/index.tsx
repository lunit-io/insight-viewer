import { Box, RadioGroup, Radio, Stack, HStack } from '@chakra-ui/react'
import { DragEvent } from '@lunit/insight-viewer'

export default function Control({
  onChange,
}: {
  onChange: (type: string) => (value: DragEvent | 'none') => void
}): JSX.Element {
  return (
    <Box mb={6}>
      <HStack spacing="80px">
        <Box w={200}>
          <Box>Primary Drag</Box>
          <RadioGroup defaultValue="none" onChange={onChange('primaryDrag')}>
            <Stack direction="row">
              <Radio value="none" className="primary-drag-none">
                none
              </Radio>
              <Radio value="pan" className="primary-drag-pan">
                pan
              </Radio>
              <Radio value="adjust" className="primary-drag-adjust">
                adjust
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <Box>
          <Box>Secondary Drag</Box>
          <RadioGroup defaultValue="none" onChange={onChange('secondaryDrag')}>
            <Stack direction="row">
              <Radio value="none" className="secondary-drag-none">
                none
              </Radio>
              <Radio value="pan" className="secondary-drag-pan">
                pan
              </Radio>
              <Radio value="adjust" className="secondary-drag-adjust">
                adjust
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </HStack>
    </Box>
  )
}
