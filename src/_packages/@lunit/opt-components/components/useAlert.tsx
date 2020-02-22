import { DialogTemplate, OpenDialog, useDialog } from '@lunit/use-dialog';
import React, { ReactNode } from 'react';
import { Button } from './Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from './Dialog';

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
