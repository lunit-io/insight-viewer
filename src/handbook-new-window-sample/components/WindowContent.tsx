import { useWindowValue } from '@lunit/new-window';
import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { WindowValue } from '../model/window-value';

export function WindowContent() {
  // <NewWindow value={}> 에서 전달한 값들을 받는다
  const value: WindowValue | undefined = useWindowValue<WindowValue>();

  return value ? (
    <div>
      <div>
        <TextField
          value={value.a}
          onChange={({ target }) => value.updateA(+target.value)}
        />{' '}
        +{' '}
        <TextField
          value={value.b}
          onChange={({ target }) => value.updateB(+target.value)}
        />{' '}
        = <span>{value.a + value.b}</span>
      </div>

      <div style={{ marginTop: 20 }}>
        {/* Window를 닫는다 */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.close()}
        >
          Close Window
        </Button>
      </div>
    </div>
  ) : null;
}
