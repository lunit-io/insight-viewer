import { Panel, Switch, SwitchRow } from '@lunit/opt-components';
import { IconButton } from '@material-ui/core';
import { Clear, Visibility, VisibilityOff } from '@material-ui/icons';
import React, { ChangeEvent, CSSProperties, DetailedHTMLProps, Fragment, LiHTMLAttributes } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';
import { Annotation, CXRAnnotationCaseStatus } from '../../model/case';
import { categorizeAnnotations, Lesion, OfLesion } from '../../model/lesion';

export interface AnnotationsPanelProps {
  hideUserContours: boolean;
  updateHideUserContours: (nextHideAIContours: boolean) => void;
  contours: Annotation[];
  onRemove: (contour: Annotation) => void;
  onUpdate: (contour: Annotation, patch: Partial<Annotation>) => void;
  status: CXRAnnotationCaseStatus;
  focusedContour: Annotation | null;
  onFocus: (contour: Annotation | null) => void;
  disabled: boolean;
}

interface DragItem {
  annotation: Annotation;
  type: string;
}

interface CollectProps {
  isOver: boolean;
  canDrop: boolean;
}

function Title({
  lesions,
  lesion,
  updateContour,
}: {
  lesions: Lesion[];
  lesion: Lesion;
  updateContour: (contour: Annotation, patch: Partial<Annotation>) => void;
}) {
  const [{ isOver, canDrop }, dropRef] = useDrop<DragItem, {}, CollectProps>({
    accept: lesions.filter(({ id }) => lesion.id !== id).map(({ id }) => id),
    drop: ({ annotation }) => {
      updateContour(annotation, {
        lesion,
        dataAttrs: {
          ...annotation.dataAttrs,
          'data-lesion': lesion.id,
        },
      });
      return {};
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const style: CSSProperties = {};

  if (isOver && canDrop) {
    style.color = '#eeef41';
  } else if (canDrop) {
    style.color = '#00a5c8';
  }

  return (
    <span ref={dropRef} style={style}>
      {lesion.label}
    </span>
  );
}

function ListItem({
  annotation,
  removeContour,
  ...liProps
}: { annotation: Annotation; removeContour: (contour: Annotation) => void } & DetailedHTMLProps<
  LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>) {
  if (!annotation.lesion) {
    throw new Error('lesion은 null일 수 없다!');
  }

  const [, dragRef] = useDrag<DragItem, {}, CollectProps>({
    item: {
      annotation,
      type: annotation.lesion.id,
    },
  });

  return (
    <li ref={dragRef} {...liProps}>
      <div>
        <span>{annotation.id}</span>
        <DeleteButton onClick={() => removeContour(annotation)} />
      </div>
    </li>
  );
}

export function AnnotationsPanelBase({
  lesions,
  hideUserContours,
  updateHideUserContours,
  contours,
  status,
  focusedContour,
  onFocus,
  disabled,
  onRemove,
  onUpdate,
}: AnnotationsPanelProps & { lesions: Lesion[] }) {
  const annotations: OfLesion<Annotation[]> = categorizeAnnotations(lesions)(contours);

  return (
    <DndProvider backend={HTML5Backend}>
      <Panel title="LESIONS" disabled={disabled}>
        <SwitchRow style={{ marginBottom: 20 }}>
          {hideUserContours ? <VisibilityOff /> : <Visibility />}

          <span>{hideUserContours ? 'Show' : 'Hide'} Annotations</span>

          <span>
            <Switch
              checked={hideUserContours}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateHideUserContours(event.target.checked)
              }
            />
          </span>
        </SwitchRow>
        {lesions.map((lesion) => (
          <Fragment key={lesion.id}>
            <LesionHeader>
              <Title lesion={lesion} lesions={lesions} updateContour={onUpdate} />
            </LesionHeader>
            {annotations[lesion.id].length > 0 && (
              <List>
                {annotations[lesion.id].map((annotation) => (
                  <ListItem
                    key={lesion.id + ':' + annotation.id}
                    role="row"
                    aria-selected={annotation === focusedContour}
                    onMouseEnter={() => onFocus(annotation)}
                    onMouseLeave={() => onFocus(null)}
                    annotation={annotation}
                    removeContour={onRemove}
                  />
                ))}
              </List>
            )}
          </Fragment>
        ))}
      </Panel>
    </DndProvider>
  );
}

const LesionHeader = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;

  &:not(:first-child) {
    margin-top: 10px;
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

const List = styled.ul`
  display: block;
  list-style: none;
  margin: 0;
  padding: 0 10px 0 0;

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
    }
  }
`;
