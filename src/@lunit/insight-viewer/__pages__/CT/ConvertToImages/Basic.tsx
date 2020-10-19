import {
  CornerstoneSequenceImage,
  CornerstoneStaticSeriesImage,
  CornerstoneViewer,
  fetchBuffer,
  InsightViewerContainer,
  installWADOImageLoader,
  mapNpyBufferToImages,
  NpyCornerstoneImages,
  ProgressViewer,
  RightTopHolder,
  StrokeText,
  useSeriesImagePosition,
  useSeriesImageScroll,
  useViewerInteractions,
} from '@lunit/insight-viewer';
import React, { useEffect, useState } from 'react';
import { Observable } from 'rxjs';
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

  const interactions = useViewerInteractions(['pan']);

  return (
    <InsightViewerContainer ref={setElement} width={width} height={height}>
      <CornerstoneViewer
        width={width}
        height={height}
        invert={false}
        flip={false}
        interactions={interactions}
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

    const buffer: Observable<number | ArrayBufferLike> = fetchBuffer({
      url: 'https://opt-frontend.s3.ap-northeast-2.amazonaws.com/fixtures/npy/image.npy',
      signal: abort.signal,
    });

    const progress: Observable<number> = buffer.pipe(
      map((progressOrBytes) => (typeof progressOrBytes === 'number' ? progressOrBytes : progressOrBytes ? 1 : 0)),
    );

    const images: Observable<NpyCornerstoneImages> = buffer.pipe(
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

    setAxial(
      new CornerstoneStaticSeriesImage({
        progress,
        images: images.pipe(map(({ axial }) => axial)),
      }),
    );
    setCoronal(
      new CornerstoneStaticSeriesImage({
        progress,
        images: images.pipe(map(({ coronal }) => coronal)),
      }),
    );
    setSagittal(
      new CornerstoneStaticSeriesImage({
        progress,
        images: images.pipe(map(({ sagittal }) => sagittal)),
      }),
    );

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
