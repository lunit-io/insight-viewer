import {
  ContourDrawer,
  ContourViewer,
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  unloadImage,
  useContour,
  useInsightViewerSync,
} from '@lunit/insight-viewer';
import React, { useEffect, useMemo, useRef, useState } from 'react';

installWADOImageLoader();

const width: number = 400;
const height: number = 500;

export default () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  const [divElement1, setDivElement1] = useState<HTMLDivElement | null>(null);
  const [divElement2, setDivElement2] = useState<HTMLDivElement | null>(null);

  const sync1 = useInsightViewerSync();
  const sync2 = useInsightViewerSync();

  const nextId = useRef<number>(0);

  const contour1 = useContour({ nextId });
  const contour2 = useContour({ nextId });

  useEffect(() => {
    const max: number = Math.max(...contour1.contours.map(({ id }) => id), ...contour2.contours.map(({ id }) => id), 0);
    nextId.current = max + 1;
  }, [nextId, contour1.contours, contour2.contours]);

  return (
    <div style={{ display: 'flex' }}>
      <InsightViewerContainer ref={setDivElement1} width={width} height={height}>
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
          updateCornerstoneRenderData={sync1.updateCornerstoneRenderData}
        />
        {contour1.contours && contour1.contours.length > 0 && sync1.cornerstoneRenderData && (
          <ContourViewer
            width={width}
            height={height}
            contours={contour1.contours}
            focusedContour={contour1.focusedContour}
            cornerstoneRenderData={sync1.cornerstoneRenderData}
          />
        )}
        {contour1.contours && sync1.cornerstoneRenderData && (
          <ContourDrawer
            width={width}
            height={height}
            contours={contour1.contours}
            draw={divElement1}
            onFocus={contour1.focusContour}
            onAdd={contour => contour1.addContour(contour)}
            onRemove={contour1.removeContour}
            cornerstoneRenderData={sync1.cornerstoneRenderData}
          />
        )}
      </InsightViewerContainer>

      <InsightViewerContainer ref={setDivElement2} width={width} height={height}>
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
          updateCornerstoneRenderData={sync2.updateCornerstoneRenderData}
        />
        {contour2.contours && contour2.contours.length > 0 && sync2.cornerstoneRenderData && (
          <ContourViewer
            width={width}
            height={height}
            contours={contour2.contours}
            focusedContour={contour2.focusedContour}
            cornerstoneRenderData={sync2.cornerstoneRenderData}
          />
        )}
        {contour2.contours && sync2.cornerstoneRenderData && (
          <ContourDrawer
            width={width}
            height={height}
            contours={contour2.contours}
            draw={divElement2}
            onFocus={contour2.focusContour}
            onAdd={contour => contour2.addContour(contour)}
            onRemove={contour2.removeContour}
            cornerstoneRenderData={sync2.cornerstoneRenderData}
          />
        )}
      </InsightViewerContainer>
    </div>
  );
};
