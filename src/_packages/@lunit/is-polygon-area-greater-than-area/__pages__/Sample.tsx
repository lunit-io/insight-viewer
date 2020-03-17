import {
  ContourDrawer,
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
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
      `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`,
      { unload: unloadImage },
    );
  }, []);

  const [divElement, setDivElement] = useState<HTMLElement | null>(null);

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
      <InsightViewerContainer ref={setDivElement} width={width} height={height}>
        <InsightViewer
          width={width}
          height={height}
          invert={false}
          flip={false}
          pan={false}
          adjust={false}
          zoom={false}
          resetTime={0}
          image={image}
          updateCornerstoneRenderData={updateCornerstoneRenderData}
        />
        {cornerstoneRenderData && (
          <ContourDrawer
            width={width}
            height={height}
            contours={[]}
            draw={divElement}
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
