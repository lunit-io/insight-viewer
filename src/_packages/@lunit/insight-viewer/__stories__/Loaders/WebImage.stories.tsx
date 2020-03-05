import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerControllerOptions,
  InsightViewerTestController,
  installWebImageLoader,
  withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import React, { useMemo } from 'react';

installWebImageLoader();

export default {
  title: 'insight-viewer/Insight Viewer',
  decorators: [withInsightViewerStorybookGlobalStyle, withOPTComponentsStorybookGlobalStyle],
};

const controllerOptions: InsightViewerControllerOptions = {
  width: [600, 400, 1000],
  height: [700, 400, 1000],
  control: ['pan', ['none', 'pan', 'adjust']],
  wheel: ['zoom', ['none', 'zoom']],
  flip: [false],
  invert: [false],
};

export const WebImage = () => {
  // Dicom Viewer
  // Pan, Adjust, Zoom과 같은 기초적인 User Interaction 기능을 가지고 있다.
  const image: CornerstoneImage = useMemo(
    () => new CornerstoneSingleImage(`https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.png`),
    [],
  );

  return (
    <InsightViewerTestController options={controllerOptions}>
      {({ width, height, invert, flip, control, wheel, resetTime }) => (
        <InsightViewer
          width={width}
          height={height}
          invert={invert} // 색상을 반전한다
          flip={flip} // 이미지를 좌우로 뒤집는다
          pan={control === 'pan'} // Pan Interaction을 활성화 한다
          adjust={control === 'adjust'} // Adjust Interaction을 활성화 한다 (Pan과 동시에 사용할 수 없다)
          zoom={wheel === 'zoom'} // Zoom Interaction을 활성화 한다
          resetTime={resetTime} // 이 값이 변경되면 Pan, Adjust, Zoom 상태가 초기화 된다
          image={image}
          updateCornerstoneRenderData={() => {}}
        />
      )}
    </InsightViewerTestController>
  );
};
