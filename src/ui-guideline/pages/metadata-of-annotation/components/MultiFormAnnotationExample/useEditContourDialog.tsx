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
import {
  Annotation,
  AnnotationInfo,
  Lesion,
  LesionLabels,
  lesions,
  Significant,
  SignificantLabels,
  significants,
} from './model';

export function useEditContourDialog(): [OpenDialog<{ annotation: Annotation }, AnnotationInfo | null>, ReactNode] {
  return useDialog(EditContour);
}

const EditContour: DialogTemplate<{ annotation: Annotation }, AnnotationInfo | null> = ({
  annotation,
  closeDialog,
}) => {
  return <EditContourDialogComponent annotation={annotation} closeDialog={closeDialog} />;
};

function EditContourDialogComponent({
  annotation,
  closeDialog,
}: {
  annotation: Annotation;
  closeDialog: (result: AnnotationInfo | null) => void;
}) {
  const [confidenceLevel, setConfidenceLevel] = useState<number>(() => annotation.confidenceLevel * 5);
  const [significant, setSignificant] = useState<Significant>(annotation.significant);
  const [lesion, setLesion] = useState<Lesion>(annotation.lesion);

  return (
    <Dialog
      open
      PaperProps={{ style: { width: 300 } }}
      onClose={() => closeDialog(null)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Annotation을 수정합니다</DialogTitle>

      <DialogContent>
        <DialogContentText>병변의 확신을 입력하세요</DialogContentText>

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

        <DialogContentText style={{ marginTop: 15 }}>임상적 중요성이 있습니까?</DialogContentText>

        <ButtonLayout direction="vertical">
          {significants.map((v) => (
            <Button
              key={v}
              label={SignificantLabels[v]}
              layout="left"
              selected={significant === v}
              onChange={(selected) => selected && setSignificant(v)}
            />
          ))}
        </ButtonLayout>

        <DialogContentText style={{ marginTop: 15 }}>의심되는 질환은 무엇입니까?</DialogContentText>

        <ButtonLayout direction="vertical">
          {lesions.map((v) => (
            <Button
              key={v}
              label={LesionLabels[v]}
              layout="left"
              selected={lesion === v}
              onChange={(selected) => selected && setLesion(v)}
            />
          ))}
        </ButtonLayout>
      </DialogContent>
      <DialogActions>
        <ButtonLayout direction="horizontal">
          <Button label="취소" onClick={() => closeDialog(null)} />
          <Button
            label="추가"
            disabled={
              annotation.confidenceLevel * 5 === confidenceLevel &&
              annotation.significant === significant &&
              annotation.lesion === lesion
            }
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
