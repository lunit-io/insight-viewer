import {
  CornerstoneFileSingleImage,
  CornerstoneImage,
  CornerstoneViewer,
  installWADOImageLoader,
  unloadImage,
  useViewerInteractions,
} from '@lunit/insight-viewer';
import React, { DragEvent, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

installWADOImageLoader();

export default () => {
  const [files, setFiles] = useState<FileList | null>(null);

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }, []);

  const onDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (
      event.dataTransfer.files.length > 0 &&
      /.dcm$/.test(event.dataTransfer.files[0].name)
    ) {
      setFiles(event.dataTransfer.files);
    }
  }, []);

  const image: CornerstoneImage | null = useMemo(
    () =>
      files && files.length > 0
        ? new CornerstoneFileSingleImage(files[0], {
            unload: unloadImage,
          })
        : null,
    [files],
  );

  const interactions = useViewerInteractions(['pan', 'zoom']);

  return image ? (
    <CornerstoneViewer
      width={400}
      height={500}
      invert={false} // 색상을 반전한다
      flip={false} // 이미지를 좌우로 뒤집는다
      interactions={interactions} // 활성화 시킬 Interaction
      resetTime={Date.now()} // 이 값이 변경되면 Pan, Adjust, Zoom 상태가 초기화 된다
      image={image}
      updateCornerstoneRenderData={() => {}}
    />
  ) : (
    <DropTarget onDrop={onDrop} onDragOver={onDragOver}>
      Drop dcm File!
    </DropTarget>
  );
};

const DropTarget = styled.div`
  width: 200px;
  height: 200px;
  background-color: red;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 10px;
  top: 10px;
`;
