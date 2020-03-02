import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { Typography } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { AdjustIcon, CircleIcon, FlipIcon, InvertIcon, MagnifyIcon, PanIcon, PenIcon, ResetIcon, LunitIcon } from '../';

storiesOf('opt-contol-icons', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('Icons', () => (
    <Typography>
      <AdjustIcon />
      <FlipIcon />
      <InvertIcon />
      <MagnifyIcon />
      <PanIcon />
      <PenIcon />
      <ResetIcon />
      <CircleIcon />
      <LunitIcon />
    </Typography>
  ));
