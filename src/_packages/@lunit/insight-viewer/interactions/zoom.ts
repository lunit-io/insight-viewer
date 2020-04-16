import { CornerstoneViewerLike } from '@lunit/insight-viewer';
import { startZoomInteraction } from '../components/interactions/startZoomInteraction';

export const zoom = ({ element }: { element?: HTMLElement | null } = {}) => ({
  getElement,
  updateViewport,
  getCurrentViewport,
  getContentWindow,
  getMinScale,
  getMaxScale,
}: CornerstoneViewerLike) => {
  if (!element) element = getElement();

  return startZoomInteraction({
    element,
    getMinMaxScale: () => [getMinScale(), getMaxScale()],
    getCurrentViewport,
    onZoom: (patch) => updateViewport(patch),
    contentWindow: getContentWindow(),
  });
};
