import { DicomViewer } from '@lunit-insight-viewer/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { imageIds } from '../../image';

export function DicomViewerDocs() {
  return (
    <div>
      <h1>DicomViewer</h1>
      <DicomViewer imageIds={imageIds} />
      <div style={{ width: '70%', marginBottom: '8px' }}>
        <h2>Low Level API Example</h2>
        <p>
          useDicomViewer hook 을 통해 image, viewport 객체를 확인할 수 있고,
          <br />
          외부에서 충분히 핸들링 할 수 있도록 하기 위함
        </p>
        <SyntaxHighlighter language="typescript">
          {dicomViewerLowLevelExample1Code}
        </SyntaxHighlighter>
      </div>
      <div style={{ width: '70%', marginBottom: '8px' }}>
        <h2>High Level API Example</h2>
        <p>
          image id 만 주입하여 바로 DicomViewer 기능을 사용할 수 있게 하기 위함
        </p>
        <SyntaxHighlighter language="typescript">
          {dicomViewerHighLevelExampleCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

const dicomViewerLowLevelExample1Code = `
  import { useDicomViewer } from '@lunit-insight-viewer/react';

  function LowLevelDicomViewer() {
    const { viewerElementRef, viewerStatus } = useDicomViewer({
      imageIds: [
        'wadouri:https://static.lunit.io/insight/samples/cxr/Nodule.dcm',
      ],
    });

    return <div style={{ width: '500px', height: '500px' }} ref={viewerElementRef} />;
  }
`;

const dicomViewerHighLevelExampleCode = `
  import { DicomViewer } from '@lunit-insight-viewer/react';

  const imageIds = [
    'wadouri:https://static.lunit.io/insight/samples/cxr/Nodule.dcm',
  ];

  function HighLevelDicomViewer() {
    return <DicomViewer imageIds={imageIds} />;
  }
`;
