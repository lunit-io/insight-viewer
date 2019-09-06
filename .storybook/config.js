import { addParameters, configure } from '@storybook/react';
import { create } from '@storybook/theming';

addParameters({
  options: {
    theme: create({
      base: 'dark',
      appBg: '#141422',
      appContentBg: '#222232',
    }),
  },
});

configure(() => {
  const req = require.context('../src', true, /\.stories\.(js|jsx|ts|tsx)$/);
  req.keys().forEach(req);
}, module);