import { Box, RadioGroup, Radio, Stack } from '@chakra-ui/react'

export default function Click({
  onChange,
}: {
  onChange: (type: string) => (value: 'click' | 'none') => void
}): JSX.Element {
  return (
    <Box mb={6}>
      <Stack direction="row" spacing="80px">
        <Box w={200}>
          <Box>Primary Click</Box>
          <RadioGroup defaultValue="none" onChange={onChange('primaryClick')}>
            <Stack direction="row">
              <Radio value="none" className="primary-none">
                none
              </Radio>
              <Radio value="click" className="primary-click">
                click
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <Box>
          <Box>Secondary Click</Box>
          <RadioGroup defaultValue="none" onChange={onChange('secondaryClick')}>
            <Stack direction="row">
              <Radio value="none" className="secondary-none">
                none
              </Radio>
              <Radio value="click" className="secondary-click">
                click
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </Stack>
    </Box>
  )
}
