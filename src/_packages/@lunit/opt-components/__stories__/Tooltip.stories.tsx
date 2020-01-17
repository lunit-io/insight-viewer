import { Tooltip, withStorybookGlobalStyle } from '@lunit/opt-components';
import { Error } from '@material-ui/icons';
import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

storiesOf('opt-components', module)
  .addDecorator(withStorybookGlobalStyle)
  .add('Tooltip', () => {
    const title = (
      <div>
        <h1>Hello</h1>
        <p>World!!! World!!!</p>
      </div>
    );
    
    return (
      <>
        <Grid style={{marginLeft: 170, marginTop: 150}}>
          <Tooltip title={title}
                   placement="top"
                   open>
            <Error/>
          </Tooltip>
          
          <Tooltip title={title}
                   placement="right"
                   open>
            <Error/>
          </Tooltip>
          
          <Tooltip title={title}
                   placement="left"
                   open>
            <Error/>
          </Tooltip>
          
          <Tooltip title={title}
                   placement="bottom"
                   open>
            <Error/>
          </Tooltip>
        </Grid>
        
        <Grid style={{marginLeft: 570, marginTop: 150}}>
          <WarningTooltip title={title}
                          placement="top"
                          open>
            <Error style={{color: 'red'}}/>
          </WarningTooltip>
          
          <WarningTooltip title={title}
                          placement="right"
                          open>
            <Error style={{color: 'red'}}/>
          </WarningTooltip>
          
          <WarningTooltip title={title}
                          placement="left"
                          open>
            <Error style={{color: 'red'}}/>
          </WarningTooltip>
          
          <WarningTooltip title={title}
                          placement="bottom"
                          open>
            <Error style={{color: 'red'}}/>
          </WarningTooltip>
        </Grid>
      </>
    );
  });

const WarningTooltip = styled(Tooltip)`
  --tooltip-background-color: red;
  --tooltip-color: yellow;
`;

const Grid = styled.div`
  position: fixed;
  
  display: grid;
  grid-template-columns: 100px 100px;
  grid-template-rows: 100px 100px;
`;
