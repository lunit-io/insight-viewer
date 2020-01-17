import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
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
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('useShortcut()', () => <Sample/>);
