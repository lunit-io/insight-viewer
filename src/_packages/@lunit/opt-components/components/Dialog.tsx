import { Dialog as MuiDialog, DialogProps } from '@material-ui/core';
import { ComponentType } from 'react';
import styled from 'styled-components';
import { lighten } from '../theme/lighten';

export { DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

export const Dialog: ComponentType<DialogProps> = styled(MuiDialog)`
  && {
    .MuiDialog-paper {
      ${lighten};

      background-color: #ffffff;

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
        overflow: unset;
      }

      .MuiDialogActions-root {
        padding: 0;
        margin: 15px 0 0 0;
        justify-content: center;
      }

      .MuiTypography-root {
        color: inherit;
      }
    }
  }
`;
