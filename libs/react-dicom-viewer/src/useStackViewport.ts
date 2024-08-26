import { useRef, useEffect, useCallback, useSyncExternalStore } from 'react';

import { ViewerFactory } from '@lunit-insight-viewer/core';

import type { MappingToolWithKey } from '@lunit-insight-viewer/core';

interface UseStackViewportParams {
  element: HTMLDivElement | null;
  imageIds: string[];
  tools?: MappingToolWithKey[];
}

export const useStackViewport = ({
  element,
  imageIds,
  tools,
}: UseStackViewportParams) => {
  const viewerFactoryRef = useRef<ViewerFactory | null>(null);

  if (!viewerFactoryRef.current) {
    const uuid = generateRandomString();
    viewerFactoryRef.current = new ViewerFactory(uuid);
  }

  const subscribe = useCallback(
    (listener: () => void) => () =>
      viewerFactoryRef!.current?.subscribe(listener),
    [element]
  );

  useSyncExternalStore(subscribe, viewerFactoryRef!.current.getSnapshot);

  useEffect(() => {
    const renderingWithInitialSettings = async () => {
      if (viewerFactoryRef.current && element) {
        await viewerFactoryRef.current.init(element, imageIds, tools);
      }
    };

    renderingWithInitialSettings();
  }, [element, imageIds, viewerFactoryRef.current]);
};

// Utils
const generateRandomString = (): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
