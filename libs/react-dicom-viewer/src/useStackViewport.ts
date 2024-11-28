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
  onCameraChange?: (viewerInfo: ViewerSnapshot) => void;
  onImageChange?: (viewerInfo: ViewerSnapshot) => void;
}

export const useStackViewport = ({
  element,
  imageIds,
  tools,
  viewerInfo,
  onChange,
  onCameraChange,
  onImageChange,
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
    if (viewerInfo) return;
    if (!viewerFactoryRef.current || !element) return;

    viewerFactoryRef.current.init({
      element,
      imageIds,
      tools,
      imageRenderEventCallback: onChange,
      cameraModifiedEventCallback: onCameraChange,
      stackNewStackEventCallback: onImageChange,
    });
  }, [
    element,
    imageIds,
    tools,
    viewerInfo,
    onChange,
    onCameraChange,
    onImageChange,
  ]);

  useEffect(() => {
    if (!viewerInfo || !viewerFactoryRef.current) return;
    if (snapshot === viewerInfo) return;

    viewerFactoryRef.current.updateSnapshot(viewerInfo);
  }, [viewerInfo, snapshot]);
};
