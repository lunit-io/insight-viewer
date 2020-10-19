import {
  Button,
  ButtonLayout,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@lunit/opt-components';
import { DialogTemplate, OpenDialog, useDialog } from '@lunit/use-dialog';
import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { lesionColors } from '../../env';
import { AnnotationInfo } from '../../model/case';
import { Lesion } from '../../model/lesion';

interface Param {
  lesions: Lesion[];
}

export function useAddAnnotationDialog(): [OpenDialog<Param, AnnotationInfo | null>, ReactNode] {
  return useDialog(AddAnnotation);
}

const AddAnnotation: DialogTemplate<Param, AnnotationInfo | null> = ({ lesions, closeDialog }) => {
  return <AddAnnotationDialogComponent lesions={lesions} closeDialog={closeDialog} />;
};

interface Props {
  lesions: Lesion[];
  closeDialog: (result: AnnotationInfo | null) => void;
}

function AddAnnotationDialogComponent({ lesions, closeDialog }: Props) {
  const [selectedLesion, setSelectedLesion] = useState<Lesion | null>(null);

  return (
    <Dialog
      open
      maxWidth="lg"
      onClose={() => closeDialog(null)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">병변의 종류를 선택해주세요.</DialogTitle>

      <DialogContent style={{ width: 300 }}>
        <ButtonLayout direction="vertical">
          {lesions.map((lesion) => (
            <LesionButton
              key={lesion.id}
              lesion={lesion}
              layout="left"
              label={lesion.label}
              selected={selectedLesion === lesion}
              onChange={(nextSelected) => nextSelected && setSelectedLesion(lesion)}
            />
          ))}
        </ButtonLayout>
      </DialogContent>

      <DialogActions>
        <ButtonLayout direction="horizontal">
          <Button label="Cancel" onClick={() => closeDialog(null)} />
          <Button
            label="OK"
            autoFocus
            disabled={!selectedLesion}
            onClick={() =>
              selectedLesion &&
              closeDialog({
                lesion: selectedLesion,
              })
            }
          />
        </ButtonLayout>
      </DialogActions>
    </Dialog>
  );
}

const LesionButton = styled(Button)<ButtonProps & { lesion: Lesion }>`
  --button-background-color: rgba(0, 0, 0, 0.35);
  --button-label-color: #ffffff;
  --button-background-color-hover: rgba(0, 0, 0, 0.5);
  --button-label-color-hover: #ffffff;
  --button-background-color-selected: ${({ lesion }) => lesionColors[lesion.id]};
  --button-label-color-selected: #ffffff;
  --button-background-color-disabled: rgba(0, 0, 0, 0.12);
  --button-label-color-disabled: rgba(255, 255, 255, 0.2);
`;
