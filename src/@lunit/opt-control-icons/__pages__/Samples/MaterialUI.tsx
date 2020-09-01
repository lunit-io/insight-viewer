import { Button, IconButton } from '@material-ui/core';
import { icons } from './Icons';
import React from 'react';
import styled from 'styled-components';

export default () => {
  return (
    <>
      <Grid>
        {icons.map((icon, i) => {
          return (
            <Button
              key={'button' + i}
              variant="contained"
              color="primary"
              startIcon={icon}
            >
              Button
            </Button>
          );
        })}
      </Grid>

      <Grid>
        {icons.map((icon, i) => {
          return (
            <IconButton key={'icon-button' + i} color="primary">
              {icon}
            </IconButton>
          );
        })}
      </Grid>
    </>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 150px);
  grid-auto-rows: 50px;
  grid-gap: 10px;
  justify-items: center;
  align-items: center;
  margin-bottom: 20px;
`;
