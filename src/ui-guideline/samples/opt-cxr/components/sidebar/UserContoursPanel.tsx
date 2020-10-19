import {
  Button,
  ButtonLayout,
  panelClasses,
  PanelToolbar,
  PanelToolbarBadge,
  SessionPanel,
  WarningTooltip,
} from '@lunit/opt-components';
import { IconButton } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { Annotation } from '../../model/annotation';

export interface UserContoursPanelProps {
  type: 'ground-truth' | 'reader-test';
  contours: Annotation[];
  focusedContour: Annotation | null;
  onFocus: (contour: Annotation | null) => void;
  onUpdate: (contour: Annotation, patch: Partial<Omit<Annotation, 'id'>>) => void;
  onRemove: (contour: Annotation) => void;
  disabled: boolean;
}

export function UserContoursPanel({
  type,
  contours,
  focusedContour,
  onFocus,
  onUpdate,
  onRemove,
  disabled,
}: UserContoursPanelProps) {
  return (
    <Panel
      title="ANNOTATIONS"
      sessionId="annotations"
      disabled={disabled}
      icon={
        contours.length === 0 ? (
          <WarningTooltip placement="left" title="Contour를 한 개 이상 그려야 합니다" />
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
                    {type === 'reader-test' && (
                      <ButtonLayout direction="horizontal" style={{ backgroundColor: '#2b3544', padding: 2 }}>
                        {[1, 2, 3, 4, 5].map((v) => (
                          <SelectionButton
                            key={'item' + v}
                            label={v.toString()}
                            layout="center"
                            selected={contour.confidenceLevel * 5 === v}
                            onChange={(selected) => selected && onUpdate(contour, { confidenceLevel: v / 5 })}
                          />
                        ))}
                      </ButtonLayout>
                    )}
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

const SelectionButton = styled(Button)`
  height: 32px !important;
`;

const List = styled.ul`
  display: block;
  list-style: none;
  margin: 0;
  padding: 14px;

  > li {
    background-color: rgba(255, 255, 255, 0.2);
    padding: 5px 15px 10px 15px;

    &:not(:last-of-type) {
      margin-bottom: 1px;
    }

    &[aria-selected='true'] {
      background-color: rgba(255, 255, 255, 0.35);
    }

    > div:first-child {
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
