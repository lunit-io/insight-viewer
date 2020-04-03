import { CornerstoneViewerLike } from '@lunit/insight-viewer';
import { startPanInteraction } from '../components/interactions/startPanInteraction';

export const pan = ({ element }: { element?: HTMLElement } = {}) => ({
  getElement,
  getCurrentViewport,
  getContentWindow,
  updateViewport,
}: CornerstoneViewerLike) => {
  if (!element) element = getElement();

  return startPanInteraction({
    element,
    getCurrentViewport,
    onMove: (translation: cornerstone.Vec2) => updateViewport({ translation }),
    onEnd: () => {},
    contentWindow: getContentWindow(),
  });
};
