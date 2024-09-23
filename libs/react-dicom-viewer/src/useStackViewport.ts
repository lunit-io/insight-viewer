/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useRef, useEffect, useSyncExternalStore } from 'react';

import { ViewerFactory } from '@lunit-insight-viewer/core';

import type {
  ViewerSnapshot,
  MappingToolWithKey,
} from '@lunit-insight-viewer/core';

interface UseStackViewportParams {
  element: HTMLDivElement | null;
  imageIds: string[];
  tools?: MappingToolWithKey[];
  viewerInfo?: ViewerSnapshot;
  onChange?: (viewerInfo: ViewerSnapshot) => void;
}

export const useStackViewport = ({
  element,
  imageIds,
  tools,
  viewerInfo,
  onChange,
}: UseStackViewportParams) => {
  const viewerFactoryRef = useRef<ViewerFactory | null>(null);

  if (!viewerFactoryRef.current) {
    viewerFactoryRef.current = new ViewerFactory();
  }

  const subscribe = (listener: () => void) => () => {
    viewerFactoryRef!.current?.subscribe(listener);
  };

  useSyncExternalStore(subscribe, viewerFactoryRef!.current.getSnapshot);

  useEffect(() => {
    const renderingWithInitialSettings = async () => {
      if (viewerFactoryRef.current && element) {
        const eventCallback = (viewerInfo: ViewerSnapshot) => {
          onChange?.(viewerInfo);
        };

        await viewerFactoryRef.current.init(
          element,
          imageIds,
          tools,
          eventCallback
        );
      }
    };

    renderingWithInitialSettings();
    /**
     * Adding onChange will most likely cause infinite rendering issues
     * If you assign a function to onChange
     * that doesn't have a useCallback and is generated on every render,
     * it will cause Causes infinite rendering
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, imageIds, tools]);

  useEffect(() => {
    if (!viewerInfo || !viewerFactoryRef.current) return;

    const currentSnapshot = viewerFactoryRef.current.getSnapshot();

    if (currentSnapshot === viewerInfo) return;

    viewerFactoryRef.current.updateSnapshot(viewerInfo);
  }, [viewerInfo]);
};
