import {
  panelClasses,
  PanelToolbar,
  PanelToolbarBadge,
  SessionPanel,
  Slider,
  WarningTooltip,
} from '@lunit/opt-components';
import { IconButton } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { Annotation } from 'ui-guideline/samples/opt-cxr/model/annotation';
import React from 'react';
import styled from 'styled-components';

export interface UserContoursPanelProps {
  contours: Annotation[];
  focusedContour: Annotation | null;
  onFocus: (contour: Annotation | null) => void;
  onUpdate: (contour: Annotation, patch: Partial<Omit<Annotation, 'id'>>) => void;
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
  return (
    <SessionPanel
      title="ANNOTATIONS"
      sessionId="annotations"
      disabled={disabled}
      icon={
        contours.length === 0 ? (
          <WarningTooltip placement="left" title="Contour를 한 개 이상 그려야 합니다" />
        ) : (
          undefined
        )
      }
      defaultExpanded
      css={`
        background-color: #104445;

        .${panelClasses.content} {
          padding: 0;
        }
      `}
    >
      {expanded => {
        return (
          <>
            {contours.length > 0 && expanded && (
              <List>
                {contours.map(contour => (
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
                    <div>
                      <Slider
                        value={Math.floor(contour.confidenceLevel * 100)}
                        onChange={(event, value) => onUpdate(contour, { confidenceLevel: +value / 100 })}
                      />
                    </div>
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
    </SessionPanel>
  );
}

const DeleteButton = styled(IconButton).attrs({
  children: <Clear />,
})`
  font-size: 1em;

  svg {
    font-size: 1em;
  }
`;

const List = styled.ul`
  display: block;
  list-style: none;
  margin: 0;
  padding: 14px;

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
