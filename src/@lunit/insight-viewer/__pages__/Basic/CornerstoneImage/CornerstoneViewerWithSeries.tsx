import {
  CornerstoneSequenceImage,
  CornerstoneSeriesImage,
  CornerstoneViewer,
  installWADOImageLoader,
  unloadImage,
  useSeriesImagePosition,
  useViewerInteractions,
} from '@lunit/insight-viewer';
import React, { useMemo } from 'react';
import series from '../../../__fixtures__/series.json';

installWADOImageLoader();

export default () => {
  const image: CornerstoneSequenceImage = useMemo(
    () =>
      new CornerstoneSeriesImage(
        series.map(
          (p) =>
            `wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/${p}`,
        ),
        { unload: unloadImage },
      ),
    [],
  );

  const { current, end } = useSeriesImagePosition(image);

  // Render 때마다 resetTime이 변경되지 않도록, Memo 값을 만든다
  const resetTime = useMemo(() => Date.now(), []);

  const interactions = useViewerInteractions(['pan', 'zoom']);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          padding: 10,
          backgroundColor: 'gray',
        }}
      >
        <button onClick={() => image.prev()}>PREV</button>
        <button onClick={() => image.next()}>NEXT</button>
        <hr />
        <div>
          {current} / {end}
        </div>
      </div>
      <div style={{ marginLeft: 120 }}>
        <CornerstoneViewer
          width={400}
          height={500}
          invert={false} // 색상을 반전한다
          flip={false} // 이미지를 좌우로 뒤집는다
          interactions={interactions} // 활성화 시킬 Interaction
          resetTime={resetTime} // 이 값이 변경되면 Pan, Adjust, Zoom 상태가 초기화 된다
          image={image}
          updateCornerstoneRenderData={() => {}}
        />
      </div>
    </>
  );
};
