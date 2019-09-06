import { DialogTemplate, useDialog } from '@lunit/use-dialog';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React, { ReactNode, useCallback, useState } from 'react';

interface ConfirmParams {
  title: string;
  description: string;
  agree?: string;
  disagree?: string;
}

const ConfirmDialogTemplate: DialogTemplate<ConfirmParams, boolean> = ({closeDialog, title, description, agree = 'Agree', disagree = 'Disagree'}) => {
  return (
    <Dialog
      open
      onClose={() => closeDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => closeDialog(false)}>
          {disagree}
        </Button>
        <Button color="primary" autoFocus onClick={() => closeDialog(true)}>
          {agree}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function Sample() {
  const [confirmResult, setConfirmResult] = useState<ReactNode>(null);
  const [openConfirm, confirmElement] = useDialog(ConfirmDialogTemplate);
  
  const callback = useCallback(async () => {
    const confirm: boolean = await openConfirm({title: 'TITLE', description: 'DESCRIPTION'});
    
    setConfirmResult(<p>Confirm result is {confirm.toString()}</p>);
  }, [openConfirm]);
  
  return (
    <div>
      <button onClick={callback}>
        Open Confirm
      </button>
      
      {confirmResult}
      {confirmElement}
    </div>
  );
}

storiesOf('use-dialog', module)
  .add('useDialog()', () => <Sample/>);
