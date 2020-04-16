import {
  ContourDrawer,
  CornerstoneImage,
  CornerstoneSingleImage,
  CornerstoneViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  Point,
  unloadImage,
  useInsightViewerSync,
} from '@lunit/insight-viewer';
import { isComplexPolygon } from '@lunit/is-complex-polygon';
import React, { ReactNode, useCallback, useMemo, useState } from 'react';

installWADOImageLoader();

const width: number = 400;
const height: number = 500;

export default () => {
  const image: CornerstoneImage = useMemo(() => {
    return new CornerstoneSingleImage(`wadouri:https://fixtures.front.lunit.io/dcm-files/series/CT000010.dcm`, {
      unload: unloadImage,
    });
  }, []);

  const [element, setElement] = useState<HTMLElement | null>(null);

  const { cornerstoneRenderData, updateCornerstoneRenderData } = useInsightViewerSync();

  const [checkResult, setCheckResult] = useState<ReactNode>(null);

  const onAdd = useCallback((polygon: Point[]) => {
    const result: boolean = isComplexPolygon(polygon);

    setCheckResult(
      <div>
        <h3>
          <span role="img" aria-label="polygon">
            🧬
          </span>{' '}
          POLYGON
        </h3>
        <div>{JSON.stringify(polygon)}</div>
        <p>
          <span role="img" aria-label="question">
            🤷‍♂️
          </span>{' '}
          IS COMPLEX POLYGON? → {result ? 'YES' : 'NO'}
        </p>
      </div>,
    );
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <InsightViewerContainer ref={setElement} width={width} height={height}>
        <CornerstoneViewer
          width={width}
          height={height}
          invert={false}
          flip={false}
          resetTime={0}
          image={image}
          updateCornerstoneRenderData={updateCornerstoneRenderData}
        />
        {cornerstoneRenderData && (
          <ContourDrawer
            width={width}
            height={height}
            contours={[]}
            draw={element}
            onFocus={() => {}}
            onAdd={onAdd}
            onRemove={() => {}}
            cornerstoneRenderData={cornerstoneRenderData}
          />
        )}
      </InsightViewerContainer>
      <div>{checkResult}</div>
    </div>
  );
};
