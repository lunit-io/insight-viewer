import {
  CircleDrawer,
  CircleViewer,
  CornerstoneImage,
  CornerstoneSingleImage,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  ProgressViewer,
  unloadWADOImage,
  useInsightViewerSync,
  useUserContour,
  withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import { storiesOf } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import { useController, withTestController } from './decorators/withTestController';

installWADOImageLoader();

function Sample() {
  const resetTime: number = useMemo(() => Date.now(), []);
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
        unload: unloadWADOImage,
      }),
    [],
  );

  const { width, height, control, wheel, invert, flip } = useController();

  // pan, adjust, zoom은
  // pan={true}로 설정하면 내부 Element를 사용해서 MouseEvent를 처리하게 되고,
  // pan={HTMLElement}로 설정하면 해당 Element를 사용해서 MouseEvent를 처리하게 된다.
  // MouseEvent를 처리하는 Layer가 여러개 중첩될 때, 하위 Layer의 MouseEvent가 막히는 현상을 해결해준다.
  const [interactionElement, setInteractionElement] = useState<HTMLElement | null>(null);

  // <InsightViewer> 내부의 Canvas Render를 외부의 다른 Component들에 동기화 시키기 위한 Hook
  const { cornerstoneRenderData, updateCornerstoneRenderData } = useInsightViewerSync();

  // Annotation (사용자 Contour)를 다루기 위한 Hook
  const { contours, focusedContour, addContour, removeContour, focusContour } = useUserContour({
    mode: 'circle',
  });

  return (
    <InsightViewerContainer ref={setInteractionElement} width={width} height={height}>
      <InsightViewer
        width={width}
        height={height}
        invert={invert}
        flip={flip}
        pan={control === 'pan' && interactionElement}
        adjust={control === 'adjust' && interactionElement}
        zoom={wheel === 'zoom' && interactionElement}
        resetTime={resetTime}
        image={image}
        updateCornerstoneRenderData={updateCornerstoneRenderData}
      />
      {// 사용자가 그린 Annotation을 보여준다
      // contours가 있는 경우에만 출력
      contours && contours.length > 0 && cornerstoneRenderData && (
        <CircleViewer
          width={width}
          height={height}
          contours={contours}
          focusedContour={focusedContour}
          cornerstoneRenderData={cornerstoneRenderData}
        />
      )}
      {// Annotation을 그리고, 지우게 해준다
      // control === 'pen' 인 경우에만 출력
      contours && cornerstoneRenderData && control === 'pen' && (
        <CircleDrawer
          width={width}
          height={height}
          contours={contours}
          draw={control === 'pen' && interactionElement}
          onFocus={focusContour}
          onAdd={contour => addContour(contour)}
          onRemove={removeContour}
          cornerstoneRenderData={cornerstoneRenderData}
        />
      )}
      <ProgressViewer image={image} width={width} height={height} />
    </InsightViewerContainer>
  );
}

storiesOf('insight-viewer', module)
  .addDecorator(withOPTComponentsStorybookGlobalStyle)
  .addDecorator(withInsightViewerStorybookGlobalStyle)
  .addDecorator(
    withTestController({
      width: [600, 400, 1000],
      height: [700, 400, 1000],
      control: ['pen', ['none', 'pen', 'pan', 'adjust']],
      wheel: ['zoom', ['none', 'zoom']],
      flip: false,
      invert: false,
    }),
  )
  .add('<CircleViewer>', () => <Sample />);
