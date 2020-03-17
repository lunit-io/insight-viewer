import { NewWindow } from '@lunit/new-window';
import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';

export function MainContent() {
  // window open
  const [open, setOpen] = useState<boolean>(false);

  // values
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(2);

  return (
    <div>
      <div>
        <TextField value={a} onChange={({ target }) => setA(+target.value)} /> +{' '}
        <TextField value={b} onChange={({ target }) => setB(+target.value)} /> = <span>{a + b}</span>
      </div>

      {open ? (
        <>
          <div style={{ marginTop: 20 }}>
            {/* Window를 닫는다 */}
            <Button variant="contained" color="primary" onClick={() => setOpen(false)}>
              Close Window
            </Button>
          </div>

          {/* Window */}
          <NewWindow
            url="/window"
            value={{
              a,
              b,
              updateA: setA,
              updateB: setB,
            }}
            features={{ width: 500, height: 400 }}
            onOpen={(popupWindow: Window) => console.log(popupWindow)}
            onClose={() => setOpen(false)}
            onBlock={() => {
              alert('Browser Pop-up 제한을 해제해주세요.');
              setOpen(false);
            }}
          />
        </>
      ) : (
        <div style={{ marginTop: 20 }}>
          {/* Window를 연다 */}
          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            Open Window
          </Button>
        </div>
      )}
    </div>
  );
}
