import {
  Button,
  ButtonLayout,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@lunit/opt-components';
import { DialogTemplate, OpenDialog, useDialog } from '@lunit/use-dialog';
import React, { ReactNode, useState } from 'react';
import { AnnotationInfo } from '../../model/annotation';

export function useAddContourDialog(): [
  OpenDialog<{}, AnnotationInfo | null>,
  ReactNode,
] {
  return useDialog(AddContour);
}

const AddContour: DialogTemplate<{}, AnnotationInfo | null> = ({
  closeDialog,
}) => {
  return <AddContourDialogComponent closeDialog={closeDialog} />;
};

function AddContourDialogComponent({
  closeDialog,
}: {
  closeDialog: (result: AnnotationInfo | null) => void;
}) {
  const [confidenceLevel, setConfidenceLevel] = useState<number>(0);

  return (
    <Dialog
      open
      onClose={() => closeDialog(null)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        병변의 확신을 입력하세요
      </DialogTitle>

      <DialogContent style={{ width: 270 }}>
        <ButtonLayout direction="horizontal">
          {[1, 2, 3, 4, 5].map((v) => (
            <Button
              key={'item' + v}
              label={v.toString()}
              layout="center"
              selected={confidenceLevel === v}
              onChange={(selected) => selected && setConfidenceLevel(v)}
            />
          ))}
        </ButtonLayout>
      </DialogContent>
      <DialogActions>
        <ButtonLayout direction="horizontal">
          <Button label="취소" onClick={() => closeDialog(null)} />
          <Button
            label="추가"
            disabled={confidenceLevel === 0}
            onClick={() =>
              closeDialog({
                confidenceLevel: confidenceLevel / 5,
              })
            }
          />
        </ButtonLayout>
      </DialogActions>
    </Dialog>
  );
}
