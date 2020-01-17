import { Switch as MuiSwitch } from '@material-ui/core';
import styled from 'styled-components';

export const Switch = styled(MuiSwitch)`
  && {
    .MuiSwitch-track {
      opacity: 1;
      background-color: var(--switch-track-color);
    }
    
    .MuiSwitch-switchBase {
      color: var(--switch-color);
      
      &.Mui-checked {
        color: var(--switch-color-checked);
      }
    }
    
    
    .Mui-checked + .MuiSwitch-track {
      opacity: 1;
      background-color: var(--switch-track-color-checked);
    }
  }
`;