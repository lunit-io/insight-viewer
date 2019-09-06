# use-shortcut

```sh
npm install @lunit/use-shortcut
```

```tsx
import { useShortcut } from '@lunit/use-shortcut'

export function Component() {
  useShortcut(({key}: KeyboardEvent) => key.toLowerCase() === 'e', () => {
    console.log('E!!!')
  })
}
```

# API

```
useShortcut({
    test: (event: KeyboardEvent) => boolean,
    callback: () => void,
    windows?: Window[], // Target windows (at use window.open())
})
```

# Sample Codes

<https://lunit-io.github.io/opt-tool-frontend>

## Stories

<!-- import **/*.stories.{ts,tsx} --title-tag h3 -->

### \_\_stories\_\_/useShortcut.stories.tsx


```tsx
import { withOptTheme } from '@lunit/opt-theme';
import { useShortcut } from '@lunit/use-shortcut';
import { storiesOf } from '@storybook/react';
import React, { ReactNode, useState } from 'react';

function Sample() {
  const [result, setResult] = useState<ReactNode>(null);
  
  useShortcut({
    test: event => event.key.toLowerCase() === 'a',
    callback: () => setResult('🍏'),
  });
  
  useShortcut({
    test: event => event.key.toLowerCase() === 'b',
    callback: () => setResult('🍌'),
  });
  
  useShortcut({
    test: event => event.key.toLowerCase() === 'c',
    callback: () => setResult('🍒'),
  });
  
  return (
    <div>
      <p>Key down "a", "b", "c"</p>
      {result}
    </div>
  );
}

storiesOf('use-shortcut', module)
  .addDecorator(withOptTheme)
  .add('useShortcut()', () => <Sample/>);

```

<!-- importend -->