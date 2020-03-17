import { DialogTemplate, OpenDialog, useDialog } from '@lunit/use-dialog';
import React, { ReactNode } from 'react';
import { Button } from './Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from './Dialog';

/**
 * const [openAlert, alertElement] = useAlert()
 *
 * 필요할 때 `openAlert({description: '...'})` 형태로 호출하면 Alert이 열린다
 *
 * `<div>{alertElement}</div>` 와 같이 `alertElement`는 화면에 포함되어 있어야 한다.
 */
export function useAlert(): [OpenDialog<AlertParams, void>, ReactNode] {
  return useDialog(AlertDialogTemplate);
}

export interface AlertParams {
  title?: ReactNode;
  description: ReactNode;
  agree?: string;
}

export const AlertDialogTemplate: DialogTemplate<AlertParams, void> = ({
  closeDialog,
  title,
  description,
  agree = 'Agree',
}) => {
  return (
    <Dialog
      open
      onClose={() => closeDialog()}
      disableBackdropClick
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}

      <DialogContent>
        <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button autoFocus layout="center" label={agree} style={{ width: 150 }} onClick={() => closeDialog()} />
      </DialogActions>
    </Dialog>
  );
};
