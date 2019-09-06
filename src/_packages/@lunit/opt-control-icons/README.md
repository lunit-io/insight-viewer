# Sample Codes

<https://lunit-io.github.io/opt-tool-frontend>

## Stories

<!-- import **/*.stories.{ts,tsx} --title-tag h3 -->

### \_\_stories\_\_/opt\-control\-icons.stories.tsx


```tsx
import { withOptTheme } from '@lunit/opt-theme';
import { Typography } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { AdjustIcon, FlipIcon, InvertIcon, MagnifyIcon, PanIcon, PenIcon, ResetIcon } from '../';

storiesOf('opt-contol-icons', module)
  .addDecorator(withOptTheme)
  .add('Icons', () => (
    <Typography>
      <AdjustIcon/>
      <FlipIcon/>
      <InvertIcon/>
      <MagnifyIcon/>
      <PanIcon/>
      <PenIcon/>
      <ResetIcon/>
    </Typography>
  ));
```

<!-- importend -->