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
  viewerStatus?: ViewerSnapshot;
  onChange?: (viewerStatus: ViewerSnapshot) => void;
}

export const useStackViewport = ({
  element,
  imageIds,
  tools,
  viewerStatus,
  onChange,
}: UseStackViewportParams) => {
  const viewerFactoryRef = useRef<ViewerFactory | null>(null);

  if (!viewerFactoryRef.current) {
    viewerFactoryRef.current = new ViewerFactory();
  }

  const subscribe = (listener: () => void) => () => {
    viewerFactoryRef!.current?.subscribe(listener);
  };

  const snapshot = useSyncExternalStore(
    subscribe,
    viewerFactoryRef!.current.getSnapshot
  );

  useEffect(() => {
    if (viewerStatus) return;
    if (!viewerFactoryRef.current || !element) return;

    viewerFactoryRef.current.init({
      element,
      imageIds,
      tools,
      imageRenderEventCallback: onChange,
    });
  }, [element, imageIds, tools, viewerStatus, onChange]);

  useEffect(() => {
    if (!viewerStatus || !viewerFactoryRef.current) return;
    if (snapshot === viewerStatus) return;

    viewerFactoryRef.current.updateSnapshot(viewerStatus);
  }, [viewerStatus, snapshot]);
};
