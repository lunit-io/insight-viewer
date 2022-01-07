import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from '@mui/material/Button'

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    color: {
      options: ['primary', 'secondary', 'error'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = args => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'button',
}

export const Secondary = Template.bind({})
Secondary.args = {
  color: 'secondary',
  children: 'button',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  children: 'button',
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  children: 'button',
}
