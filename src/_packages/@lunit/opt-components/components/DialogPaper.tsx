import { Paper } from '@material-ui/core';
import styled from 'styled-components';

export const DialogPaper = styled(Paper)`
  width: fit-content;
  height: fit-content;
  padding: 30px 50px;
  background-color: #ffffff;
  color: #242e3e;
  border-radius: 0;
  
  > div {
    text-align: center;
  }
  
  --button-background-color: #00a4c8;
  --button-label-color: rgba(255, 255, 255, 0.8);
  --button-background-color-hover: #008cb0;
  --button-label-color-hover: rgba(255, 255, 255, 1);
  --button-background-color-selected: #007294;
  --button-label-color-selected: rgba(255, 255, 255, 1);
  --button-background-color-disabled: rgba(0,164,200,0.65);
  --button-label-color-disabled: rgba(255, 255, 255, 0.2);
`;