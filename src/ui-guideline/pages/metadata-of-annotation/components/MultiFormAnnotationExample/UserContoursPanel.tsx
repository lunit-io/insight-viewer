import {
  panelClasses,
  PanelToolbar,
  PanelToolbarBadge,
  SessionPanel,
  WarningTooltip,
} from '@lunit/opt-components';
import { IconButton } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import {
  Annotation,
  AnnotationInfo,
  LesionLabels,
  SignificantLabels,
} from './model';
import { useEditContourDialog } from './useEditContourDialog';

export interface UserContoursPanelProps {
  contours: Annotation[];
  focusedContour: Annotation | null;
  onFocus: (contour: Annotation | null) => void;
  onUpdate: (
    contour: Annotation,
    patch: Partial<Omit<Annotation, 'id'>>,
  ) => void;
  onRemove: (contour: Annotation) => void;
  disabled: boolean;
}

export function UserContoursPanel({
  contours,
  focusedContour,
  onFocus,
  onUpdate,
  onRemove,
  disabled,
}: UserContoursPanelProps) {
  const [
    openEditContourDialog,
    editContourDialogElement,
  ] = useEditContourDialog();

  const edit = useCallback(
    async (annotation: Annotation) => {
      const result: AnnotationInfo | null = await openEditContourDialog({
        annotation,
      });

      if (result) {
        onUpdate(annotation, result);
      }
    },
    [onUpdate, openEditContourDialog],
  );

  return (
    <>
      <Panel
        title="ANNOTATIONS"
        sessionId="annotations"
        disabled={disabled}
        icon={
          contours.length === 0 ? (
            <WarningTooltip
              placement="left"
              title="Contour를 한 개 이상 그려야 합니다"
            />
          ) : undefined
        }
        defaultExpanded
      >
        {(expanded) => {
          return (
            <>
              {contours.length > 0 && expanded && (
                <List>
                  {contours.map((contour) => (
                    <li
                      key={contour.id}
                      role="row"
                      aria-selected={contour === focusedContour}
                      onMouseEnter={() => onFocus(contour)}
                      onMouseLeave={() => onFocus(null)}
                    >
                      <div>
                        <span>{contour.id}</span>

                        <DeleteButton onClick={() => onRemove(contour)} />
                      </div>
                      <Info onClick={() => edit(contour)}>
                        <tbody>
                          <tr>
                            <th>확신</th>
                            <td>{contour.confidenceLevel * 5}</td>
                          </tr>
                          <tr>
                            <th>중요성</th>
                            <td>{SignificantLabels[contour.significant]}</td>
                          </tr>
                          <tr>
                            <th>질환</th>
                            <td>{LesionLabels[contour.lesion]}</td>
                          </tr>
                        </tbody>
                      </Info>
                    </li>
                  ))}
                </List>
              )}

              {contours.length > 0 && (
                <PanelToolbar>
                  <PanelToolbarBadge>{contours.length}</PanelToolbarBadge>
                </PanelToolbar>
              )}
            </>
          );
        }}
      </Panel>
      {editContourDialogElement}
    </>
  );
}

const Panel = styled(SessionPanel)`
  background-color: #104445;

  .${panelClasses.content} {
    padding: 0;
  }
`;

const DeleteButton = styled(IconButton).attrs({
  children: <Clear />,
})`
  font-size: 1em;

  svg {
    font-size: 1em;
  }
`;

const Info = styled.table`
  width: 100%;
  font-size: 13px;
  cursor: pointer;

  th,
  td {
    padding: 5px 0;
  }

  th {
    width: 45px;
  }

  tr:not(:last-child) {
    th,
    td {
      border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    }
  }
`;

const List = styled.ul`
  display: block;
  list-style: none;
  margin: 0;
  padding: 14px;
  user-select: none;

  > li {
    background-color: rgba(255, 255, 255, 0.2);
    padding: 5px 15px;

    &:not(:last-of-type) {
      margin-bottom: 1px;
    }

    &[aria-selected='true'] {
      background-color: rgba(255, 255, 255, 0.35);
    }

    > div {
      color: rgba(255, 255, 255, 0.7);
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: space-between;

      > button {
        padding: 5px;
        margin-right: -7px;
      }

      &:nth-child(2) {
        margin-top: 5px;
      }
    }
  }
`;
