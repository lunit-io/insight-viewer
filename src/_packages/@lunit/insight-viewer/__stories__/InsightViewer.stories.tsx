import {
  CornerstoneImage,
  CornerstoneSeriesImage,
  CornerstoneSingleImage,
  HeatmapViewer,
  InsightViewer,
  InsightViewerContainer,
  InsightViewerControllerOptions,
  InsightViewerTestController,
  installWADOImageLoader,
  ProgressViewer,
  unloadImage,
  useBulkImagePosition,
  useBulkImageScroll,
  useInsightViewerSync,
  useViewportMirroring,
  withInsightViewerStorybookGlobalStyle,
} from '@lunit/insight-viewer';
import { withOPTComponentsStorybookGlobalStyle } from '@lunit/opt-components';
import React, { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import data from '../__fixtures__/posMap.sample.json';
import series from '../__fixtures__/series.json';

installWADOImageLoader();

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

export const Basic = () => {
  // Dicom Viewer
  // Pan, Adjust, Zoom과 같은 기초적인 User Interaction 기능을 가지고 있다.
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
        unload: unloadImage,
      }),
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

export const InteractionWithHTMLElement = () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  // pan, adjust, zoom props는 `boolean | HTMLElement | null` 값을 받을 수 있다.
  // `boolean`으로 입력되는 경우 `<InsightViewer>` 자체적으로 `MouseEvent`를 처리하지만,
  // `HTMLElement | null`로 입력되는 경우는 `MouseEvent` 처리를 입력된 `HTMLElement`를 사용하게 된다.
  //
  // `MouseEvent`의 위임은 `<InsightViewer>`, `<ContourDrawer>`와 같이 `MouseEvent`를 사용하는
  // 여러개의 Layer를 겹쳐서 사용해야 하는 경우, 하위에 위치한 Layer들의 `MouseEvent`가 차단되는 현상을 방지한다.
  const [divElement, setDivElement] = useState<HTMLDivElement | null>(null);

  return (
    <InsightViewerTestController options={controllerOptions}>
      {({ width, height, invert, flip, control, wheel, resetTime }) => (
        <InsightViewerContainer ref={setDivElement} width={width} height={height}>
          <InsightViewer
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            pan={control === 'pan' && divElement} // divElement를 사용해서 Pan Interaction을 처리한다
            adjust={control === 'adjust' && divElement}
            zoom={wheel === 'zoom' && divElement}
            resetTime={resetTime}
            image={image}
            updateCornerstoneRenderData={() => {}}
          />
        </InsightViewerContainer>
      )}
    </InsightViewerTestController>
  );
};

export const ViewportSyncWithLayers = () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  const [divElement, setDivElement] = useState<HTMLDivElement | null>(null);

  // 화면에 보여지는 여러개의 Layer들을 동기화 시킬 수 있다.
  const { cornerstoneRenderData, updateCornerstoneRenderData } = useInsightViewerSync();

  return (
    <InsightViewerTestController options={controllerOptions}>
      {({ width, height, invert, flip, control, wheel, resetTime }) => (
        <InsightViewerContainer ref={setDivElement} width={width} height={height}>
          <InsightViewer
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            pan={control === 'pan' && divElement}
            adjust={control === 'adjust' && divElement}
            zoom={wheel === 'zoom' && divElement}
            resetTime={resetTime}
            image={image}
            updateCornerstoneRenderData={updateCornerstoneRenderData} // Render data를 받는다
          />
          <HeatmapViewer
            width={width}
            height={height}
            posMap={data.engine_result.engine_result.pos_map}
            threshold={0.1}
            cornerstoneRenderData={cornerstoneRenderData} // Render data를 전달한다
          />
        </InsightViewerContainer>
      )}
    </InsightViewerTestController>
  );
};

const controllerOptionsWithScroll: InsightViewerControllerOptions = {
  ...controllerOptions,
  wheel: ['scroll', ['none', 'zoom', 'scroll']],
};

export const SeriesImage = () => {
  // CT와 같이 여러개의 이미지를 연결해서 보여줘야 할 때 사용할 수 있다.
  const image: CornerstoneSeriesImage = useMemo(
    () =>
      new CornerstoneSeriesImage(
        series.map(p => `wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/${p}`),
        { unload: unloadImage },
      ),
    [],
  );

  const [divElement, setDivElement] = useState<HTMLDivElement | null>(null);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(false);

  // Wheel을 사용해서 SeriesImage의 위치를 제어한다
  useBulkImageScroll({
    image,
    element: divElement,
    enabled: scrollEnabled,
  });

  // 현재 SeriesImage의 위치와 전체 이미지 수량을 알 수 있다
  const { current, end } = useBulkImagePosition(image);

  return (
    <InsightViewerTestController options={controllerOptionsWithScroll}>
      {({ width, height, invert, flip, control, wheel, resetTime }) => {
        setScrollEnabled(wheel === 'scroll');

        return (
          <InsightViewerContainer ref={setDivElement} width={width} height={height}>
            <InsightViewer
              width={width}
              height={height}
              invert={invert}
              flip={flip}
              pan={control === 'pan' && divElement}
              adjust={control === 'adjust' && divElement}
              zoom={wheel === 'zoom' && divElement}
              resetTime={resetTime}
              image={image}
              updateCornerstoneRenderData={() => {}}
            />

            <RightTopHolder>
              {current} / {end}
            </RightTopHolder>

            <ProgressViewer image={image} width={width} height={height} />
          </InsightViewerContainer>
        );
      }}
    </InsightViewerTestController>
  );
};

const RightTopHolder = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
  font-size: 20px;
  color: #ffffff;
  pointer-events: none;
  user-select: none;
`;

const flexControllerOptions: InsightViewerControllerOptions = {
  width: [300, 200, 500],
  height: [400, 300, 600],
  control: 'pan',
  wheel: 'zoom',
  flip: [false],
  invert: [false],
};

export const ViewportMirroring = () => {
  const image1: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  const image2: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000020.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  const image3: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000030.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  const mirror2 = useRef<InsightViewer>(null);
  const mirror3 = useRef<InsightViewer>(null);

  // 여러개의 <InsightViewer>를 동기화 시킬 수 있다
  // Mirror로 등록된 <InsightViewer>들은 같은 사이즈를 가지고 있어야 한다
  const { updateMasterRenderData } = useViewportMirroring(mirror2, mirror3);

  return (
    <InsightViewerTestController options={flexControllerOptions}>
      {({ width, height, invert, flip, control, wheel, resetTime }) => (
        <div style={{ display: 'flex' }}>
          <InsightViewer
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            pan={control === 'pan'}
            adjust={control === 'adjust'}
            zoom={wheel === 'zoom'}
            resetTime={resetTime}
            image={image1}
            updateCornerstoneRenderData={updateMasterRenderData} // Render Data를 받는다
          />
          <InsightViewer
            ref={mirror2} // Mirror를 설정한다
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            pan={false}
            adjust={false}
            zoom={false}
            resetTime={0}
            image={image2}
            updateCornerstoneRenderData={() => {}}
          />
          <InsightViewer
            ref={mirror3} // Mirror를 설정한다
            width={width}
            height={height}
            invert={invert}
            flip={flip}
            pan={false}
            adjust={false}
            zoom={false}
            resetTime={0}
            image={image3}
            updateCornerstoneRenderData={() => {}}
          />
        </div>
      )}
    </InsightViewerTestController>
  );
};

export const MulticastImage = () => {
  const image: CornerstoneImage = useMemo(
    () =>
      new CornerstoneSingleImage(`wadouri:https://lunit-frontend-fixtures.netlify.com/dcm-files/series/CT000010.dcm`, {
        unload: unloadImage,
      }),
    [],
  );

  // 하나의 CornerstoneImage를 여러개의 <InsightViewer>에서 사용해도 문제 없다
  return (
    <InsightViewerTestController options={flexControllerOptions}>
      {({ width, height, invert, flip, control, wheel, resetTime }) => (
        <div style={{ display: 'flex' }}>
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
        </div>
      )}
    </InsightViewerTestController>
  );
};
