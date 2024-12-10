/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useRef, useEffect, useSyncExternalStore } from 'react';

import { ViewerFactory } from '@lunit-insight-viewer/core';

import type { ViewerSnapshot } from '@lunit-insight-viewer/core';

interface UseStackViewportParams {
  element: HTMLDivElement | null;
  imageIds: string[];
  viewerStatus?: ViewerSnapshot;
  onChange?: (viewerStatus: ViewerSnapshot) => void;
}

export const useStackViewport = ({
  element,
  imageIds,
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
    if (snapshot) return;
    if (!viewerFactoryRef.current || !element) return;

    viewerFactoryRef.current.init({
      element,
      imageIds,
      viewerStatus: viewerStatus ?? null,
      imageRenderEventCallback: onChange,
    });
  }, [element, imageIds, viewerStatus, snapshot, onChange]);

  useEffect(() => {
    if (!snapshot) return;
    if (!viewerStatus || !viewerFactoryRef.current) return;
    if (snapshot === viewerStatus) return;
    if (!(viewerStatus.image && viewerStatus.viewport)) return;

    viewerFactoryRef.current.updateSnapshot(viewerStatus);
  }, [viewerStatus, snapshot]);
};
