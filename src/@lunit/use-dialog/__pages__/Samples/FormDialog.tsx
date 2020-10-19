import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@lunit/opt-components';
import { DialogProps, DialogTemplate, OpenDialog, useDialog } from '@lunit/use-dialog';
import { Button as MuiButton, TextField } from '@material-ui/core';
import React, { ReactNode, useCallback, useState } from 'react';

interface FormParams {
  initialValue?: string;
}

type FormReturn = { value: string } | null;

function useForm(): [OpenDialog<FormParams, FormReturn>, ReactNode] {
  return useDialog(FormTemplate);
}

// 내부적으로 State (e.g. useState()) 를 사용하지 않으면 useAlert() 과 같이
// FormTemplate 에서 바로 JSX Template을 구성하면 되지만,
const FormTemplate: DialogTemplate<FormParams, FormReturn> = (props) => {
  return <FormComponent {...props} />;
};

// 아래와 같이 useState()를 사용하는 경우엔 이렇게 한 단계 더 만들어주도록 한다.
function FormComponent({ initialValue = '', closeDialog }: DialogProps<FormParams, FormReturn>) {
  const [value, setValue] = useState<string>(() => initialValue);

  return (
    <Dialog
      open
      onClose={() => closeDialog(null)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <TextField
            inputProps={{
              style: {
                color: 'black',
              },
            }}
            fullWidth
            value={value}
            onChange={({ target }) => setValue(target.value)}
          />
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button layout="center" label="Cancel" style={{ width: 150 }} onClick={() => closeDialog(null)} />
        <Button
          autoFocus
          layout="center"
          label="OK"
          style={{ width: 150 }}
          disabled={value.trim() === initialValue.trim() || value.trim().length === 0}
          onClick={() => closeDialog({ value })}
        />
      </DialogActions>
    </Dialog>
  );
}

export default () => {
  const [value, setValue] = useState<string>('');

  const [openForm, formElement] = useForm();

  const onFormOpen = useCallback(async () => {
    // await를 사용해서 Dialog의 응답을 기다린다
    const result: FormReturn = await openForm({
      initialValue: value,
    });

    // null이 아닌 경우
    if (result) {
      // 얻어낸 result data를 처리한다
      setValue(result.value);
    }
  }, [value, openForm]);

  return (
    <div>
      <MuiButton onClick={onFormOpen}>Open Form</MuiButton>

      <div style={{ marginTop: 20 }}>{value}</div>

      {/* Element는 반드시 Binding 시켜줘야 한다 */}
      {formElement}
    </div>
  );
};
