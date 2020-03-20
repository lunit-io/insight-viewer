import {
  CornerstoneSequenceImage,
  CornerstoneSeriesImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  unloadImage,
  useSeriesImageScroll,
} from '@lunit/insight-viewer';
import React, { useMemo, useState } from 'react';
import series from '../../../__fixtures__/series.json';

installWADOImageLoader();

export default () => {
  const image: CornerstoneSequenceImage = useMemo(
    () =>
      new CornerstoneSeriesImage(
        series.map(p => `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/${p}`),
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

  return (
    <InsightViewerContainer ref={setElement} width={400} height={500}>
      <InsightViewer
        width={400}
        height={500}
        invert={false} // 색상을 반전한다
        flip={false} // 이미지를 좌우로 뒤집는다
        pan={element} // Pan Interaction을 활성화 한다
        adjust={false} // Adjust Interaction을 활성화 한다 (Pan과 동시에 사용할 수 없다)
        zoom={wheel === 'zoom' && element} // Zoom Interaction을 활성화 한다
        resetTime={0} // 이 값이 변경되면 Pan, Adjust, Zoom 상태가 초기화 된다
        image={image}
        updateCornerstoneRenderData={() => {}}
      />
    </InsightViewerContainer>
  );
};
