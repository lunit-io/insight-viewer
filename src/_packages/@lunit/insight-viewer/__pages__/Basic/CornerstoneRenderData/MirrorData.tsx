import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  installWADOImageLoader,
  unloadImage,
  useViewportMirroring,
} from '@lunit/insight-viewer';
import React, { useMemo, useRef } from 'react';

installWADOImageLoader();

export default () => {
  const image1: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  const image2: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000020.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  const image3: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000030.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  const viewer2 = useRef<InsightViewer>(null);

  const viewer3 = useRef<InsightViewer>(null);

  const { updateMasterRenderData } = useViewportMirroring(viewer2, viewer3);

  const resetTime = useMemo<number>(() => Date.now(), []);

  return (
    <div style={{ display: 'flex' }}>
      <InsightViewer
        width={400}
        height={500}
        invert={false}
        flip={false}
        pan={true}
        adjust={false}
        zoom={true}
        resetTime={resetTime}
        image={image1}
        updateCornerstoneRenderData={updateMasterRenderData}
      />
      <InsightViewer
        ref={viewer2}
        width={400}
        height={500}
        invert={false}
        flip={false}
        pan={true}
        adjust={false}
        zoom={true}
        resetTime={resetTime}
        image={image2}
        updateCornerstoneRenderData={() => {}}
      />
      <InsightViewer
        ref={viewer3}
        width={400}
        height={500}
        invert={false}
        flip={false}
        pan={true}
        adjust={false}
        zoom={true}
        resetTime={resetTime}
        image={image3}
        updateCornerstoneRenderData={() => {}}
      />
    </div>
  );
};
