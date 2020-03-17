import { useAlert, useConfirm } from '@lunit/opt-components';
import { Button } from '@material-ui/core';
import React, { useCallback } from 'react';

export default () => {
  const [openAlert, alertElement] = useAlert();
  const [openConfirm, confirmElement] = useConfirm();

  const onAlert = useCallback(async () => {
    await openAlert({
      description: 'ALERT COMPONENT',
    });
  }, [openAlert]);

  const onConfirm = useCallback(async () => {
    const result: boolean = await openConfirm({
      description: 'CONFIRM COMPONENT',
    });

    await openAlert({
      description: `CONFIRM RESULT IS ${result}`,
    });
  }, [openConfirm, openAlert]);

  return (
    <div>
      <Button onClick={onAlert}>Open Alert</Button>

      <Button onClick={onConfirm}>Open Confirm</Button>

      {alertElement}
      {confirmElement}
    </div>
  );
};
