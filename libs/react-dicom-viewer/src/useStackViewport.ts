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

  const snapshot = useSyncExternalStore(
    subscribe,
    viewerFactoryRef!.current.getSnapshot
  );

  /* initialize viewer */
  useEffect(() => {
    if (viewerInfo) return;
    if (!viewerFactoryRef.current || !element) return;

    viewerFactoryRef.current.init(element, imageIds, tools, onChange);
  }, [element, imageIds, tools, viewerInfo, onChange]);

  /* sync viewer with viewerInfo */
  useEffect(() => {
    if (!viewerInfo || !viewerFactoryRef.current || !element) return;
    if (snapshot === viewerInfo) return;

    viewerFactoryRef.current.updateSnapshot(viewerInfo, element);
  }, [viewerInfo, snapshot, element]);

  /* update viewer configuration */
  useEffect(() => {
    if (!viewerFactoryRef.current || !element) return;

    viewerFactoryRef.current.updateViewerConfiguration(imageIds, tools);
  }, [element, imageIds, tools]);
};
