import {
  Contour,
  CornerstoneImage,
  CornerstoneSingleImage,
  CornerstoneViewer,
  InsightViewerContainer,
  InsightViewerControllerOptions,
  InsightViewerTestController,
  installWADOImageLoader,
  PointViewer,
  unloadImage,
  useContour,
  useInsightViewerSync,
} from '@lunit/insight-viewer';
import { PointPinProps } from '@lunit/insight-viewer/components/PointPin';
import React, { useMemo } from 'react';
import styled from 'styled-components';

function labelFunction({ id }: Contour): string {
  return 'p' + id;
}

const initialContours: Omit<Contour, 'id'>[] = [
  {
    label: labelFunction,
    polygon: [[177.85263157894738, 148.04210526315788]],
  },
  {
    label: labelFunction,
    polygon: [[255.1017543859649, 217.20701754385965]],
  },
  {
    label: labelFunction,
    polygon: [[390.7368421052632, 118.39999999999999]],
  },
  {
    label: labelFunction,
    polygon: [[329.6561403508772, 391.4666666666667]],
  },
];

installWADOImageLoader();

const controllerOptions: InsightViewerControllerOptions = {
  width: [600, 400, 1000],
  height: [700, 400, 1000],
  control: ['pen', ['none', 'pan', 'pen', 'adjust']],
  wheel: ['zoom', ['none', 'zoom']],
  flip: [false],
  invert: [false],
};

function CustomPointPin({ x, y, label, onEnter, onLeave, onRemove, ...gProps }: PointPinProps) {
  const onClick = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    event.preventDefault();

    onRemove();
  };

  return (
    <g {...gProps} transform={`translate(${x} ${y})`} onMouseEnter={onEnter} onMouseLeave={onLeave} onClick={onClick}>
      <circle cx={0} cy={0} r={15} fill="black" />

      <circle cx={0} cy={0} r={11} style={{ fill: 'var(--pin-color)' }} />

      {label && (
        <g transform="translate(0 5)">
          <text fill="black" textAnchor="middle">
            {label}
          </text>
        </g>
      )}
    </g>
  );
}

const CustomStyleViewer = styled(PointViewer).attrs(() => ({
  pointPinComponent: CustomPointPin,
}))`
  [data-id='1'] {
    --pin-color: red;
  }

  [data-id='2'] {
    --pin-color: yellow;
  }
`;

export default () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  const { cornerstoneRenderData, updateCornerstoneRenderData } = useInsightViewerSync();

  // create contour data
  const { contours, focusedContour, addContour, removeContour, focusContour } = useContour({
    mode: 'point',
    initialContours,
  });

  return (
    <InsightViewerTestController options={controllerOptions}>
      {({ width, height, invert, flip, control, wheel, resetTime, element, setElement, interactions }) => (
        <InsightViewerContainer ref={setElement} width={width} height={height}>
          <CornerstoneViewer
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            interactions={interactions}
            resetTime={resetTime}
            image={image}
            updateCornerstoneRenderData={updateCornerstoneRenderData}
          />
          {contours && cornerstoneRenderData && (
            <CustomStyleViewer
              width={width}
              height={height}
              contours={contours}
              interact={control === 'pen'}
              focusedContour={focusedContour}
              onFocus={focusContour}
              onAdd={(polygon) => addContour(polygon, { label: labelFunction })}
              onRemove={removeContour}
              cornerstoneRenderData={cornerstoneRenderData}
            />
          )}
        </InsightViewerContainer>
      )}
    </InsightViewerTestController>
  );
};
