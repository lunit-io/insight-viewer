import { Contour, PointViewer } from '@lunit/insight-viewer';
import React from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import styled from 'styled-components';
import { LiveAnnotationExample } from '../../../components/examples/LiveAnnotationExample';

const initialContours: Contour[] = [
  {
    id: 1,
    polygon: [[177.85263157894738, 148.04210526315788]],
  },
  {
    id: 2,
    polygon: [[255.1017543859649, 217.20701754385965]],
  },
  {
    id: 3,
    polygon: [[390.7368421052632, 118.39999999999999]],
  },
  {
    id: 4,
    polygon: [[329.6561403508772, 391.4666666666667]],
  },
];

function Example({ width, height, Viewer }: { width: number; height: number; Viewer: typeof PointViewer }) {
  return (
    <LiveAnnotationExample width={width} height={height} initialContours={initialContours} contourMode="point">
      {({ contours, cornerstoneRenderData, focusedContour }) => {
        return (
          <>
            {contours && contours.length > 0 && cornerstoneRenderData && (
              <Viewer
                width={width}
                height={height}
                contours={contours}
                interact={false}
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
const Viewer = styled(PointViewer)\`
  [data-id="1"] {
    --pin-color: red;
  }
  
  [data-id="2"] {
    --pin-color: yellow;
  }
\`;

render(<Example Viewer={Viewer} width={width} height={height} />);
`;

export function LivePointAnnotationExample2({ width, height }: { width: number; height: number }) {
  return (
    <LiveProvider
      code={styleCode.trim()}
      scope={{
        PointViewer,
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
