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
