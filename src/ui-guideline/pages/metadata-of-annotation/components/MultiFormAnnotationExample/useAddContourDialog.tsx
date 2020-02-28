import {
  Button,
  ButtonLayout,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@lunit/opt-components';
import { DialogTemplate, OpenDialog, useDialog } from '@lunit/use-dialog';
import React, { ReactNode, useState } from 'react';
import { AnnotationInfo, Lesion, LesionLabels, lesions, Significant, SignificantLabels, significants } from './model';

export function useAddContourDialog(): [OpenDialog<{}, AnnotationInfo | null>, ReactNode] {
  return useDialog(AddContour);
}

const AddContour: DialogTemplate<{}, AnnotationInfo | null> = ({ closeDialog }) => {
  return <AddContourDialogComponent closeDialog={closeDialog} />;
};

function AddContourDialogComponent({ closeDialog }: { closeDialog: (result: AnnotationInfo | null) => void }) {
  const [confidenceLevel, setConfidenceLevel] = useState<number>(0);
  const [significant, setSignificant] = useState<Significant>('non-significant');
  const [lesion, setLesion] = useState<Lesion>('none');

  return (
    <Dialog
      open
      PaperProps={{ style: { width: 300 } }}
      onClose={() => closeDialog(null)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Annotation에 부가 정보를 입력해주세요</DialogTitle>

      <DialogContent>
        <DialogContentText>병변의 확신을 입력하세요</DialogContentText>

        <ButtonLayout direction="horizontal">
          {[1, 2, 3, 4, 5].map(v => (
            <Button
              key={'item' + v}
              label={v.toString()}
              layout="center"
              selected={confidenceLevel === v}
              onChange={selected => selected && setConfidenceLevel(v)}
            />
          ))}
        </ButtonLayout>

        <DialogContentText style={{ marginTop: 15 }}>임상적 중요성이 있습니까?</DialogContentText>

        <ButtonLayout direction="vertical">
          {significants.map(v => (
            <Button
              key={v}
              label={SignificantLabels[v]}
              layout="left"
              selected={significant === v}
              onChange={selected => selected && setSignificant(v)}
            />
          ))}
        </ButtonLayout>

        <DialogContentText style={{ marginTop: 15 }}>의심되는 질환은 무엇입니까?</DialogContentText>

        <ButtonLayout direction="vertical">
          {lesions.map(v => (
            <Button
              key={v}
              label={LesionLabels[v]}
              layout="left"
              selected={lesion === v}
              onChange={selected => selected && setLesion(v)}
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
                significant,
                lesion,
              })
            }
          />
        </ButtonLayout>
      </DialogActions>
    </Dialog>
  );
}
