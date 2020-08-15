import { fileToBuffer } from '@lunit/insight-viewer';
import React, { DragEvent, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

export default () => {
  const [log, setLog] = useState<string[]>([]);

  const [files, setFiles] = useState<FileList | null>(null);

  useEffect(() => {
    if (files && files.length > 0) {
      const abort = new AbortController();
      const subscription = fileToBuffer({
        signal: abort.signal,
        blob: files[0].slice(),
      }).subscribe((progressOrBytes) => {
        if (typeof progressOrBytes === 'number') {
          setLog((prev) => [...prev, `[progress] ${progressOrBytes}`]);
        } else {
          setLog((prev) => [...prev, `[done] bytes: ${progressOrBytes.byteLength}`]);
        }
      });

      return () => {
        abort.abort();
        subscription.unsubscribe();
      };
    }
  }, [files]);

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }, []);

  const onDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (event.dataTransfer.files.length > 0 && /.npy$/.test(event.dataTransfer.files[0].name)) {
      setFiles(event.dataTransfer.files);
    }
  }, []);

  return (
    <>
      <DropTarget onDrop={onDrop} onDragOver={onDragOver}>
        Drop CT npy File!
      </DropTarget>

      <ul style={{ fontSize: 11, marginLeft: 220 }}>
        {log.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    </>
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
