import { useRef, useEffect, useCallback, useSyncExternalStore } from 'react';
import { v4 as uuidV4 } from 'uuid';

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
    const uuid = uuidV4();
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
