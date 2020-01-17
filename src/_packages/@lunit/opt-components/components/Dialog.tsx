import { Dialog as MuiDialog } from '@material-ui/core';
import styled from 'styled-components';

export { DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

export const Dialog = styled(MuiDialog)`
  && {
    .MuiDialog-paper {
      background-color: #ffffff;
      color: #242e3e;
      border-radius: 0;
      
      padding: 30px 50px;
      
      .MuiDialogTitle-root {
        color: inherit;
        padding: 0;
        margin: 0 0 15px 0;
      }
      
      .MuiDialogContent-root {
        color: inherit;
        padding: 0;
        margin: 0;
      }
      
      .MuiDialogActions-root {
        padding: 0;
        margin: 15px 0 0 0;
        justify-content: center;
      }
      
      .MuiTypography-root {
        color: inherit;
      }
      
      --button-background-color: #00a4c8;
      --button-label-color: rgba(255, 255, 255, 0.8);
      --button-background-color-hover: #008cb0;
      --button-label-color-hover: rgba(255, 255, 255, 1);
      --button-background-color-selected: #007294;
      --button-label-color-selected: rgba(255, 255, 255, 1);
      --button-background-color-disabled: rgba(0,164,200,0.65);
      --button-label-color-disabled: rgba(255, 255, 255, 0.2);
    }
  }
`;