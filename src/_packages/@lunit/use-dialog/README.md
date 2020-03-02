# Install

```sh
npm install @lunit/use-dialog
```

# API

```
type Props<P, R> = P & {
  closeDialog: (returnValue: R) => void;
};

type OpenDialog<P, R> = (p: P) => Promise<R>;

type DialogTemplate<P = {}, R = void> = (props: Props<P, R>) => ReactNode;

function useDialog<P = {}, R = void>(dialogTemplate: DialogTemplate<P, R>): [OpenDialog<P, R>, ReactNode]; 
```

# Sample Codes

<https://lunit-io.github.io/opt-tool-frontend>

## Stories

<!-- import **/*.stories.{ts,tsx} --title-tag h3 -->

### \_\_stories\_\_/useDialog.stories.tsx


```tsx
import { withInsightViewerStorybookGlobalStyle } from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
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

const ConfirmDialogTemplate: DialogTemplate<ConfirmParams, boolean> = ({
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
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
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
    const confirm: boolean = await openConfirm({ title: 'TITLE', description: 'DESCRIPTION' });

    setConfirmResult(<p>Confirm result is {confirm.toString()}</p>);
  }, [openConfirm]);

  return (
    <div>
      <button onClick={callback}>Open Confirm</button>

      {confirmResult}
      {confirmElement}
    </div>
  );
}

storiesOf('use-dialog', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('useDialog()', () => <Sample />);

```

<!-- importend -->