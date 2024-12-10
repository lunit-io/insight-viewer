/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useRef, useEffect, useSyncExternalStore } from 'react';

import { ViewerFactory } from '@lunit-insight-viewer/core';

import type { ViewerSnapshot, Tool } from '@lunit-insight-viewer/core';

interface UseStackViewportParams {
  element: HTMLDivElement | null;
  imageIds: string[];
  tool: Tool;
  viewerStatus?: ViewerSnapshot;
  onChange?: (viewerStatus: ViewerSnapshot) => void;
}

export const useStackViewport = ({
  element,
  imageIds,
  tool,
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
      tool,
      imageRenderEventCallback: onChange,
    });
  }, [element, imageIds, tool, viewerStatus, onChange]);

  useEffect(() => {
    if (!viewerStatus || !viewerFactoryRef.current) return;
    if (snapshot === viewerStatus) return;

    viewerFactoryRef.current.updateSnapshot(viewerStatus);
  }, [viewerStatus, snapshot]);

  useEffect(() => {
    viewerFactoryRef.current?.updateViewerSetting(tool);
  }, [tool]);
};
