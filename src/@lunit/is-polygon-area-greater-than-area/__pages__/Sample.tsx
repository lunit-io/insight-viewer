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
import { isPolygonAreaGreaterThanArea } from '@lunit/is-polygon-area-greater-than-area';
import React, { ReactNode, useCallback, useMemo, useState } from 'react';

installWADOImageLoader();

const width: number = 400;
const height: number = 500;

const isGreaterThanArea: number = 100;

export default () => {
  const image: CornerstoneImage = useMemo(() => {
    return new CornerstoneSingleImage(
      `wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`,
      {
        unload: unloadImage,
      },
    );
  }, []);

  const [element, setElement] = useState<HTMLElement | null>(null);

  const { cornerstoneRenderData, updateCornerstoneRenderData } = useInsightViewerSync();

  const [checkResult, setCheckResult] = useState<ReactNode>(null);

  const onAdd = useCallback((polygon: Point[]) => {
    const result: boolean = isPolygonAreaGreaterThanArea(polygon, isGreaterThanArea);

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
          IS GREATER THAN AREA({isGreaterThanArea})? → {result ? 'YES' : 'NO'}
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
