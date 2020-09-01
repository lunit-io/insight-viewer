`/login`, `/change-password`, `/bye` 등 Auth Form 화면을 구성하기 위한 Component 모음

대체적으로 styled-components wrapper 들로 구성되어있음

# Sample Codes

<https://lunit-io.github.io/opt-tool-frontend>

## Stories

<!-- import **/*.stories.{ts,tsx} --title-tag h3 -->

### \_\_stories\_\_/Button.stories.tsx

```tsx
import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { Progress } from '@lunit/opt-login-components';
import { storiesOf } from '@storybook/react';
import React, { CSSProperties } from 'react';
import { Button } from '../components/Button';
import { SubmitContainer } from '../components/SubmitContainer';

const style: CSSProperties = { width: 300 };

storiesOf('opt-login-components', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('<Button>', () => (
    <Button style={style} variant="outlined" size="large">
      Submit
    </Button>
  ))
  .add('<Button disabled>', () => (
    <Button style={style} variant="outlined" size="large" disabled>
      Submit
    </Button>
  ))
  .add('<Button> + <Progress>', () => (
    <SubmitContainer style={style}>
      <Button style={style} variant="outlined" size="large" disabled>
        Submit
      </Button>

      <Progress size={24} />
    </SubmitContainer>
  ));
```

### \_\_stories\_\_/TextInput.stories.tsx

```tsx
import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { CSSProperties } from 'react';
import { TextInput } from '../components/TextInput';

const style: CSSProperties = { width: 300 };

storiesOf('opt-login-components', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('<TextInput>', () => (
    <TextInput
      style={style}
      placeholder="PLACEHOLDER"
      margin="dense"
      variant="outlined"
    />
  ))
  .add('<TextInput disabled>', () => (
    <TextInput
      style={style}
      placeholder="PLACEHOLDER"
      margin="dense"
      variant="outlined"
      disabled
    />
  ));
```

<!-- importend -->

## Tests

<!-- import **/*.test.{ts,tsx} --title-tag h3 -->

<!-- importend -->

<!-- import __tests__/*.{ts,tsx} --title-tag h3 -->

<!-- importend -->
