import { key, useShortcut } from '@lunit/use-shortcut';
import React, { ReactNode, useState } from 'react';

export default () => {
  const [result, setResult] = useState<ReactNode>(null);

  useShortcut({
    // 직접 KeyboardEvent를 받아서 처리해도 되고,
    test: (event) => event.key.toLowerCase() === 'a',
    callback: () => setResult('🍏'),
  });

  useShortcut({
    // key()를 사용해도 된다
    test: key('b'),
    callback: () => setResult('🍌'),
  });

  useShortcut({
    test: key('c'),
    callback: () => setResult('🍒'),
  });

  useShortcut({
    // 여러개의 key를 할당할 수도 있다
    test: key(['d', 'e']),
    callback: () => setResult('📖'),
  });

  useShortcut({
    // ctrl, alt, shift 를 같이 할댱할 수도 있다
    // Browser, OS Key들이 보통 Meta key와 함께 발동되기 때문에 가능한 사용하지 않는게 좋다.
    test: key('f', { ctrl: true }),
    callback: () => setResult('🚒'),
  });

  return (
    <div>
      <p>Key down "a", "b", "c", "d", "e", "f"</p>
      {result}
    </div>
  );
};
