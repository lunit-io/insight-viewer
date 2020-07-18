import { CornerstoneViewerLike } from '@lunit/insight-viewer';
import { startAdjustInteraction } from '../components/interactions/startAdjustInteraction';

export const adjust = ({ element }: { element?: HTMLElement | null } = {}) => ({
  getElement,
  getCurrentViewport,
  updateViewport,
  getContentWindow,
}: CornerstoneViewerLike) => {
  if (!element) element = getElement();

  return startAdjustInteraction({
    element,
    getCurrentViewport,
    onMove: (voi: cornerstone.VOI) => updateViewport({ voi }),
    onEnd: () => {},
    contentWindow: getContentWindow(),
  });
};
