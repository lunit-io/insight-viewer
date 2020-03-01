import {
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  InsightViewerControllerOptions,
  InsightViewerControllerState,
  InsightViewerTestController,
  installWADOImageLoader,
  ProgressCollector,
  ProgressViewer,
  unloadWADOImage,
  useContainerStyleOfProgressViewersInactivity,
  useProgressViewersActivity,
  withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { CSSProperties, useMemo } from 'react';

installWADOImageLoader();

const controllerOptions: InsightViewerControllerOptions = {
  width: [250, 200, 600],
  height: [300, 200, 800],
  control: ['pan', ['none', 'pan', 'adjust']],
  wheel: ['zoom', ['none', 'zoom']],
  flip: [false],
  invert: [false],
};

function Sample() {
  // <ProgressCollector>는 하위의 <ProgressViewer>들의 상태를 수집한다
  return (
    <ProgressCollector>
      <Container />
    </ProgressCollector>
  );
}

function Container() {
  const images: CornerstoneImage[] = useMemo(() => {
    return [
      'wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm',
      `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000011.dcm`,
      `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000012.dcm`,
      `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000013.dcm`,
    ].map(imageId => new CornerstoneSingleImage(imageId, { unload: unloadWADOImage }));
  }, []);

  // <ProgressCollector>에서 수집한 정보를 얻을 수 있다
  const progressActivity: boolean = useProgressViewersActivity();
  // 혹은 <ProgressViewer>가 동작중일때 비활성을 처리할 Style을 만들 수 있다
  const containerDisabledStyle: CSSProperties = useContainerStyleOfProgressViewersInactivity({
    pointerEvents: 'none',
  });

  return (
    <InsightViewerTestController options={controllerOptions}>
      {controllerStates => (
        <div style={containerDisabledStyle}>
          <div style={{ display: 'flex' }}>
            {images.map(image => (
              <Component image={image} {...controllerStates} />
            ))}
          </div>
          <p>
            {progressActivity
              ? '<ProgressViewer>가 하나 이상 작동 중입니다!!!'
              : '동작중인 <ProgressViewer>가 없습니다!!!'}
          </p>
        </div>
      )}
    </InsightViewerTestController>
  );
}

function Component({
  image,
  width,
  height,
  invert,
  flip,
  control,
  wheel,
  resetTime,
}: { image: CornerstoneImage } & InsightViewerControllerState) {
  return (
    <InsightViewerContainer width={width} height={height}>
      <InsightViewer
        width={width}
        height={height}
        invert={invert}
        flip={flip}
        pan={control === 'pan'}
        adjust={control === 'adjust'}
        zoom={wheel === 'zoom'}
        resetTime={resetTime}
        image={image}
        updateCornerstoneRenderData={() => {}}
      />
      {/* 이 <ProgressViewer>가 <ProgressCollector>에 수집된다 */}
      <ProgressViewer image={image} width={width} height={height} />
    </InsightViewerContainer>
  );
}

storiesOf('insight-viewer/Utils', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .add('<ProgressCollector>', () => <Sample />);
