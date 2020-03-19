import {
  CornerstoneSequenceImage,
  CornerstoneStaticSeriesImage,
  fetchBuffer,
  InsightViewer,
  InsightViewerContainer,
  installWADOImageLoader,
  mapNpyBufferToImages,
  ProgressViewer,
  RightTopHolder,
  StrokeText,
  useSeriesImagePosition,
  useSeriesImageScroll,
} from '@lunit/insight-viewer';
import React, { useEffect, useState } from 'react';
import { filter, map } from 'rxjs/operators';

installWADOImageLoader();

const width: number = 300;
const height: number = 300;

function Viewer({ image }: { image: CornerstoneSequenceImage }) {
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  useSeriesImageScroll({
    image,
    element,
  });

  const { current, end } = useSeriesImagePosition(image);

  return (
    <InsightViewerContainer ref={setElement} width={width} height={height}>
      <InsightViewer
        width={width}
        height={height}
        invert={false}
        flip={false}
        pan={true}
        adjust={false}
        zoom={false}
        resetTime={0}
        image={image}
        updateCornerstoneRenderData={() => {}}
      />
      <ProgressViewer width={width} height={height} image={image} />
      <RightTopHolder>
        <StrokeText>
          <text>
            <tspan fill="#ffffff">{current}</tspan>
            &nbsp; &nbsp;
            <tspan fill="#8694B1">/</tspan>
            &nbsp; &nbsp;
            <tspan fill="#ffffff">{end}</tspan>
          </text>
        </StrokeText>
      </RightTopHolder>
    </InsightViewerContainer>
  );
}

export default () => {
  const [axial, setAxial] = useState<CornerstoneSequenceImage | null>(null);
  const [coronal, setCoronal] = useState<CornerstoneSequenceImage | null>(null);
  const [sagittal, setSagittal] = useState<CornerstoneSequenceImage | null>(null);

  useEffect(() => {
    const abort = new AbortController();

    const buffer = fetchBuffer({
      url: 'https://opt-frontend.s3.ap-northeast-2.amazonaws.com/fixtures/npy/image.npy',
      signal: abort.signal,
    });

    const progress = buffer.pipe(
      map(progressOrBytes => (typeof progressOrBytes === 'number' ? progressOrBytes : progressOrBytes ? 1 : 0)),
    );

    const images = buffer.pipe(
      filter<number | ArrayBufferLike, ArrayBufferLike>(
        (progressOrBytes: number | ArrayBufferLike): progressOrBytes is ArrayBufferLike => {
          return typeof progressOrBytes !== 'number' && !!progressOrBytes;
        },
      ),
      mapNpyBufferToImages({
        id: 'ct-test',
        sliceSpacing: 3.0,
        rowPixelSpacing: 0.9765625,
        columnPixelSpacing: 0.9765625,
        windowWidth: 1500.0,
        windowCenter: -600.0,
      }),
    );

    setAxial(new CornerstoneStaticSeriesImage({ progress, images: images.pipe(map(({ axial }) => axial)) }));
    setCoronal(new CornerstoneStaticSeriesImage({ progress, images: images.pipe(map(({ coronal }) => coronal)) }));
    setSagittal(new CornerstoneStaticSeriesImage({ progress, images: images.pipe(map(({ sagittal }) => sagittal)) }));

    return () => {
      abort.abort();
    };
  }, []);

  return axial && coronal && sagittal ? (
    <div style={{ display: 'flex' }}>
      <Viewer image={axial} />
      <Viewer image={coronal} />
      <Viewer image={sagittal} />
    </div>
  ) : (
    <div>...in progress</div>
  );
};
