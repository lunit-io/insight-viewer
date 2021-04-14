import React, { ReactElement } from 'react'
import { action } from '@storybook/addon-actions'
import Button from '../src/Button'

export const Text = (): ReactElement => (
  <Button onClick={action('clicked')}>Hello</Button>
)

export const Emoji = (): ReactElement => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
)

export default {
  title: 'Button',
  component: Button,
}
