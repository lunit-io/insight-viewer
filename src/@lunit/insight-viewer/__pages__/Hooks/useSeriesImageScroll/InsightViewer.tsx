import {
  CornerstoneSequenceImage,
  CornerstoneSeriesImage,
  CornerstoneViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  unloadImage,
  useSeriesImageScroll,
  useViewerInteractions,
} from '@lunit/insight-viewer';
import React, { useMemo, useState } from 'react';
import series from '../../../__fixtures__/series.json';

installWADOImageLoader();

export default () => {
  const image: CornerstoneSequenceImage = useMemo(
    () =>
      new CornerstoneSeriesImage(
        series.map((p) => `wadouri:https://lunit-io.github.io/frontend-fixtures/dcm-files/series/${p}`),
        { unload: unloadImage },
      ),
    [],
  );

  const wheel = useMemo<'zoom' | 'scroll'>(() => 'scroll', []);

  const [element, setElement] = useState<HTMLElement | null>(null);

  useSeriesImageScroll({
    image,
    element,
    enabled: wheel === 'scroll',
  });

  const interactions = useViewerInteractions(['pan', wheel], { element });
  // 아래와 동일하다
  //const interactions = useMemo(
  //  () => [
  //    pan({ element }), // pan
  //    wheel === 'zoom' && zoom({ element }), // zoom
  //  ],
  //  [element, wheel],
  //);

  return (
    <InsightViewerContainer ref={setElement} width={400} height={500}>
      <CornerstoneViewer
        width={400}
        height={500}
        invert={false} // 색상을 반전한다
        flip={false} // 이미지를 좌우로 뒤집는다
        interactions={interactions}
        resetTime={0} // 이 값이 변경되면 Pan, Adjust, Zoom 상태가 초기화 된다
        image={image}
        updateCornerstoneRenderData={() => {}}
      />
    </InsightViewerContainer>
  );
};
