import {
  CornerstoneImage,
  CornerstoneSingleImage,
  CornerstoneViewer,
  installWADOImageLoader,
  unloadImage,
  useViewerInteractions,
  useViewportMirroring,
} from '@lunit/insight-viewer';
import React, { useMemo, useRef } from 'react';

installWADOImageLoader();

export default () => {
  const image1: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(
        `wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000010.dcm`,
        {
          unload: unloadImage,
        },
      ),
    [],
  );

  const image2: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(
        `wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000020.dcm`,
        {
          unload: unloadImage,
        },
      ),
    [],
  );

  const image3: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(
        `wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/CT000030.dcm`,
        {
          unload: unloadImage,
        },
      ),
    [],
  );

  const viewer2 = useRef<CornerstoneViewer>(null);
  const viewer3 = useRef<CornerstoneViewer>(null);

  const { updateMasterRenderData } = useViewportMirroring(viewer2, viewer3);

  const resetTime = useMemo<number>(() => Date.now(), []);

  const interactions = useViewerInteractions(['pan', 'zoom']);

  return (
    <div style={{ display: 'flex' }}>
      <CornerstoneViewer
        width={400}
        height={500}
        invert={false}
        flip={false}
        interactions={interactions}
        resetTime={resetTime}
        image={image1}
        updateCornerstoneRenderData={updateMasterRenderData}
      />
      <CornerstoneViewer
        ref={viewer2}
        width={400}
        height={500}
        invert={false}
        flip={false}
        interactions={interactions}
        resetTime={resetTime}
        image={image2}
        updateCornerstoneRenderData={() => {}}
      />
      <CornerstoneViewer
        ref={viewer3}
        width={400}
        height={500}
        invert={false}
        flip={false}
        interactions={interactions}
        resetTime={resetTime}
        image={image3}
        updateCornerstoneRenderData={() => {}}
      />
    </div>
  );
};
