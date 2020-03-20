import { fetchBuffer } from '@lunit/insight-viewer';
import React, { useEffect, useState } from 'react';

export default () => {
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    const abort = new AbortController();
    const subscription = fetchBuffer({
      url: 'https://opt-frontend.s3.ap-northeast-2.amazonaws.com/fixtures/npy/image.npy',
      signal: abort.signal,
    }).subscribe(progressOrBytes => {
      if (typeof progressOrBytes === 'number') {
        setLog(prev => [...prev, `[progress] ${progressOrBytes}`]);
      } else {
        setLog(prev => [...prev, `[done] bytes: ${progressOrBytes.byteLength}`]);
      }
    });

    return () => {
      abort.abort();
      subscription.unsubscribe();
    };
  }, []);

  return (
    <ul style={{ fontSize: 11 }}>
      {log.map((line, i) => (
        <li key={i}>{line}</li>
      ))}
    </ul>
  );
};
