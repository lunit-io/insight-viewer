import { Box, RadioGroup, Radio, Stack } from '@chakra-ui/react'
import { DragAction } from '@lunit/insight-viewer'

export default function Control({
  onChange,
}: {
  onChange: (type: string) => (value: DragAction | 'none') => void
}): JSX.Element {
  return (
    <Box mb={6}>
      <Stack direction="row" spacing="80px">
        <Box>
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
              <Radio value="zoom" className="primary-drag-zoom">
                zoom
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
              <Radio value="zoom" className="secondary-drag-zoom">
                zoom
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </Stack>
    </Box>
  )
}
