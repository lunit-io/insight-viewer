import { RefObject } from 'react';
import { InsightViewer } from '../components/InsightViewer';
import { CornerstoneViewerLike, ViewportTransform } from '../types';

export function updateViewport(
  viewer:
    | InsightViewer
    | RefObject<InsightViewer>
    | CornerstoneViewerLike
    | RefObject<CornerstoneViewerLike>,
  update: ViewportTransform,
) {
  let v: InsightViewer | CornerstoneViewerLike | null = null;

  if ('updateViewer' in viewer) {
    v = viewer;
  } else if ('current' in viewer && viewer.current) {
    v = viewer.current;
  }

  if (!v) return;

  const patch = update(v.getViewportTransformParams());

  if (patch) {
    v.updateViewport(patch);
  }
}

export const zoomMiddleLeft: (increment: number) => ViewportTransform = (
  increment,
) => ({ element, currentViewport, minScale, maxScale }) => {
  if (!currentViewport) return;

  const nextScale: number = Math.max(
    minScale,
    Math.min(
      maxScale,
      currentViewport.scale + currentViewport.scale * increment,
    ),
  );

  if (currentViewport.scale === nextScale) return;

  const { width } = element.getBoundingClientRect();

  const distanceX: number = width / -2;
  const distanceY: number = 0;

  const dx: number = (1 - nextScale / currentViewport.scale) * distanceX;
  const dy: number = (1 - nextScale / currentViewport.scale) * distanceY;

  return {
    translation: {
      x: currentViewport.translation.x + dx / nextScale,
      y: currentViewport.translation.y + dy / nextScale,
    },
    scale: nextScale,
  };
};

export const zoomMiddleRight: (increment: number) => ViewportTransform = (
  increment,
) => ({ element, currentViewport, minScale, maxScale }) => {
  if (!currentViewport) return;

  const nextScale: number = Math.max(
    minScale,
    Math.min(
      maxScale,
      currentViewport.scale + currentViewport.scale * increment,
    ),
  );

  if (currentViewport.scale === nextScale) return;

  const { width } = element.getBoundingClientRect();

  const distanceX: number = width / 2;
  const distanceY: number = 0;

  const dx: number = (1 - nextScale / currentViewport.scale) * distanceX;
  const dy: number = (1 - nextScale / currentViewport.scale) * distanceY;

  return {
    translation: {
      x: currentViewport.translation.x + dx / nextScale,
      y: currentViewport.translation.y + dy / nextScale,
    },
    scale: nextScale,
  };
};

export const zoomMiddleCenter: (increment: number) => ViewportTransform = (
  increment,
) => ({ element, currentViewport, minScale, maxScale }) => {
  if (!currentViewport) return;

  const nextScale: number = Math.max(
    minScale,
    Math.min(
      maxScale,
      currentViewport.scale + currentViewport.scale * increment,
    ),
  );

  if (currentViewport.scale === nextScale) return;

  const distanceX: number = 0;
  const distanceY: number = 0;

  const dx: number = (1 - nextScale / currentViewport.scale) * distanceX;
  const dy: number = (1 - nextScale / currentViewport.scale) * distanceY;

  return {
    translation: {
      x: currentViewport.translation.x + dx / nextScale,
      y: currentViewport.translation.y + dy / nextScale,
    },
    scale: nextScale,
  };
};

export const adjustWindowCenter: (increment: number) => ViewportTransform = (
  increment,
) => ({ currentViewport }) => {
  if (!currentViewport) return;

  const { windowWidth, windowCenter } = currentViewport.voi;

  return {
    voi: {
      windowWidth,
      windowCenter: Math.max(
        Math.floor(windowCenter + windowCenter * increment),
        1,
      ),
    },
  };
};

export const adjustWindowWidth: (increment: number) => ViewportTransform = (
  increment,
) => ({ currentViewport }) => {
  if (!currentViewport) return;

  const { windowWidth, windowCenter } = currentViewport.voi;

  return {
    voi: {
      windowWidth: Math.max(
        Math.floor(windowWidth + windowWidth * increment),
        1,
      ),
      windowCenter,
    },
  };
};
