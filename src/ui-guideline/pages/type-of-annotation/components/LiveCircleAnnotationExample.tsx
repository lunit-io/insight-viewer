import { CircleViewer, Contour } from '@lunit/insight-viewer';
import React from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import styled from 'styled-components';
import { LiveAnnotationExample } from '../../../components/examples/LiveAnnotationExample';

const initialContours: Contour[] = [
  {
    id: 1,
    polygon: [
      [257.7964912280702, 142.79298245614035],
      [282.94736842105266, 174.2315789473684],
    ],
  },
  {
    id: 2,
    polygon: [
      [332.35087719298247, 286.51228070175443],
      [293.7263157894737, 297.29122807017546],
    ],
  },
  {
    id: 3,
    polygon: [
      [140.1263157894737, 335.01754385964915],
      [185.03859649122808, 345.7964912280702],
    ],
  },
];

function Example({ width, height, Viewer }: { width: number; height: number; Viewer: typeof CircleViewer }) {
  return (
    <LiveAnnotationExample width={width} height={height} initialContours={initialContours} contourMode="contour">
      {({ contours, cornerstoneRenderData, focusedContour }) => {
        return (
          <>
            {contours && contours.length > 0 && cornerstoneRenderData && (
              <Viewer
                width={width}
                height={height}
                contours={contours}
                focusedContour={focusedContour}
                cornerstoneRenderData={cornerstoneRenderData}
              />
            )}
          </>
        );
      }}
    </LiveAnnotationExample>
  );
}

const styleCode = `
const Viewer = styled(CircleViewer)\`
  [data-id="1"] {
    --contour-viewer-color: red;
    --contour-viewer-stroke-width: 5px;
  }
  
  [data-id="2"] {
    --contour-viewer-color: yellow;
    --contour-viewer-stroke-width: 2px;
  }
  
  circle[data-id="2"] {
    stroke-dasharray: 6,4;
  }
\`;

render(<Example Viewer={Viewer} width={width} height={height} />);
`;

export function LiveCircleAnnotationExample({ width, height }: { width: number; height: number }) {
  return (
    <LiveProvider
      code={styleCode.trim()}
      scope={{
        CircleViewer,
        Example,
        styled,
        width,
        height,
      }}
      noInline
    >
      <div style={{ display: 'flex' }}>
        <LivePreview style={{ width }} />
        <div style={{ flex: 1 }}>
          <LiveEditor />
          <LiveError />
        </div>
      </div>
    </LiveProvider>
  );
}
