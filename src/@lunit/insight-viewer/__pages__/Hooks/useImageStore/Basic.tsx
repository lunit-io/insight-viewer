import {
  CornerstoneImage,
  CornerstoneViewer,
  ImageStoreProvider,
  InsightViewerContainer,
  InsightViewerControllerOptions,
  InsightViewerTestController,
  installWADOImageLoader,
  ProgressViewer,
  useImageStore,
} from '@lunit/insight-viewer';
import { Button } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import series from '../../../__fixtures__/series.json';

installWADOImageLoader();

const controllerOptions: InsightViewerControllerOptions = {
  width: [600, 400, 1000],
  height: [700, 400, 1000],
  control: ['pan', ['none', 'pan', 'adjust']],
  wheel: ['zoom', ['none', 'zoom']],
  flip: [false],
  invert: [false],
};

const imageIds: string[] = series
  .slice(0, 10)
  .map((p) => `wadouri:https://static.lunit.io/fixtures/dcm-files/series/${p}`);

function Sample() {
  const { fetch } = useImageStore();

  const [imageId, setImageId] = useState<string>(() => imageIds[0]);

  const image = useMemo<CornerstoneImage>(() => fetch(imageId), [
    fetch,
    imageId,
  ]);

  useEffect(() => {
    // 1 ~ 4번 이미지들을 Prefetch 한다
    // 1 ~ 4번 이미지들은 빠르게 뜨게 될 것이다
    fetch(imageIds[1]);
    fetch(imageIds[2]);
    fetch(imageIds[3]);
    fetch(imageIds[4]);
  }, [fetch]);

  return (
    <div style={{ display: 'flex' }}>
      <InsightViewerTestController options={controllerOptions}>
        {({
          width,
          height,
          invert,
          flip,
          control,
          wheel,
          resetTime,
          element,
          setElement,
          interactions,
        }) => (
          <InsightViewerContainer width={width} height={height}>
            <CornerstoneViewer
              width={width}
              height={height}
              invert={invert}
              flip={flip}
              interactions={interactions}
              resetTime={resetTime}
              image={image}
              updateCornerstoneRenderData={() => {}}
            />
            <ProgressViewer width={width} height={height} image={image} />
          </InsightViewerContainer>
        )}
      </InsightViewerTestController>
      <div>
        <ul>
          {imageIds.map((imageId, i) => (
            <li key={imageId}>
              <Button onClick={() => setImageId(imageId)}>
                Show Image {i}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// 상위에 <ImageStoreProvider>가 반드시 필요하다
export default () => (
  <ImageStoreProvider>
    <Sample />
  </ImageStoreProvider>
);
