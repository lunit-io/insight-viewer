import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from '@mui/material/Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Button,
} as ComponentMeta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = args => <Button {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children: 'Button',
}

export const Secondary = Template.bind({})
Secondary.args = {
  color: 'secondary',
  children: 'Button',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  children: 'Button',
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  children: 'Button',
}
