import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'dark',
    appBg: '#141422',
    appContentBg: '#222232',
  }),
});