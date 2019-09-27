import { Typography } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { AdjustIcon, CircleIcon, FlipIcon, InvertIcon, MagnifyIcon, PanIcon, PenIcon, ResetIcon } from '../';

storiesOf('opt-contol-icons', module)
  .add('Icons', () => (
    <Typography>
      <AdjustIcon/>
      <FlipIcon/>
      <InvertIcon/>
      <MagnifyIcon/>
      <PanIcon/>
      <PenIcon/>
      <ResetIcon/>
      <CircleIcon/>
    </Typography>
  ));