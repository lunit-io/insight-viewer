import styled from 'styled-components';
import { DicomViewer } from '@lunit-insight-viewer/react';

import { imageIds, imageIds2, tools } from './image';

export function MultiViewer() {
  return (
    <MultiViewerWrapper>
      <div style={{ display: 'flex', gap: 2, width: '500px', height: '500px' }}>
        <DicomViewer imageIds={imageIds} tools={tools} />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '500px',
          height: '500px',
        }}
      >
        <DicomViewer imageIds={imageIds2} tools={tools} />
      </div>
    </MultiViewerWrapper>
  );
}

const MultiViewerWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
