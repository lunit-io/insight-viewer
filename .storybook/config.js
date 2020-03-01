import { addParameters, configure } from '@storybook/react';
import { create } from '@storybook/theming';

addParameters({
  options: {
    enableShortcuts: false,
    isToolshown: false,
    theme: create({
      base: 'dark',
      appBg: '#141422',
      appContentBg: '#222232',
    }),
  },
});

configure(require.context('../src', true, /stories\.(js|jsx|ts|tsx)$/), module);