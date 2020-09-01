import {
  Button,
  ButtonLayout,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
} from '@lunit/opt-components';
import { DialogTemplate, OpenDialog, useDialog } from '@lunit/use-dialog';
import { AnnotationInfo } from 'ui-guideline/samples/opt-cxr/model/annotation';
import React, { ReactNode, useState } from 'react';

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
        <Slider
          value={confidenceLevel}
          onChange={(event, value) => setConfidenceLevel(+value)}
        />
      </DialogContent>
      <DialogActions>
        <ButtonLayout direction="horizontal">
          <Button label="취소" onClick={() => closeDialog(null)} />
          <Button
            label="추가"
            disabled={confidenceLevel === 0}
            onClick={() =>
              closeDialog({
                confidenceLevel: confidenceLevel / 100,
              })
            }
          />
        </ButtonLayout>
      </DialogActions>
    </Dialog>
  );
}
