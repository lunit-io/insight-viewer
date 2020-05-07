import { DialogTemplate, OpenDialog, useDialog } from '@lunit/use-dialog';
import React, { ReactNode } from 'react';
import { Button } from './Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from './Dialog';

export function useConfirm(): [OpenDialog<ConfirmParams, boolean>, ReactNode] {
  return useDialog(ConfirmDialogTemplate);
}

export interface ConfirmParams {
  title?: ReactNode;
  description: ReactNode;
  agree?: string;
  disagree?: string;
}

export const ConfirmDialogTemplate: DialogTemplate<ConfirmParams, boolean> = ({
  closeDialog,
  title,
  description,
  agree = 'Agree',
  disagree = 'Disagree',
}) => {
  return (
    <Dialog
      open
      onClose={() => closeDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}

      <DialogContent>
        <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button layout="center" label={disagree} style={{ width: 150 }} onClick={() => closeDialog(false)} />
        <Button autoFocus layout="center" label={agree} style={{ width: 150 }} onClick={() => closeDialog(true)} />
      </DialogActions>
    </Dialog>
  );
};
