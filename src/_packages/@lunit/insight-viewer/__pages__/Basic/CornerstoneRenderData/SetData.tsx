import {
  CornerstoneImage,
  CornerstoneSingleImage,
  CornerstoneViewer,
  HeatmapViewer,
  installWADOImageLoader,
  unloadImage,
  useInsightViewerSync,
  useViewerInteractions,
} from '@lunit/insight-viewer';
import React, { useMemo } from 'react';
import data from '../../../__fixtures__/posMap.sample.json';

installWADOImageLoader();

export default () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000010.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  const { cornerstoneRenderData, updateCornerstoneRenderData } = useInsightViewerSync();

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
        image={image}
        updateCornerstoneRenderData={updateCornerstoneRenderData} // 받아서
      />
      <div style={{ position: 'relative', width: 400, height: 500, backgroundColor: 'navy' }}>
        <HeatmapViewer
          width={400}
          height={500}
          posMap={data.engine_result.engine_result.pos_map}
          threshold={0.1}
          cornerstoneRenderData={cornerstoneRenderData} // 넣어준다
        />
      </div>
    </div>
  );
};
