import {
  AdjustIcon,
  CircleIcon,
  FlipIcon,
  InvertIcon,
  LunitIcon,
  MagnifyIcon,
  PanIcon,
  PenIcon,
  ResetIcon,
} from '@lunit/opt-control-icons';
import React from 'react';
import styled from 'styled-components';

export const icons = [
  <AdjustIcon />,
  <FlipIcon />,
  <InvertIcon />,
  <MagnifyIcon />,
  <PanIcon />,
  <PenIcon />,
  <ResetIcon />,
  <CircleIcon />,
  <LunitIcon />,
];

export default () => {
  return (
    <Grid>
      {icons.map((icon, i) => {
        return <div key={'icon' + i}>{icon}</div>;
      })}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 50px);
  grid-auto-rows: 50px;
  grid-gap: 10px;
  justify-items: stretch;
  align-items: stretch;

  > div {
    background-color: silver;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
