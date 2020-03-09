import { HandbookTreeNode } from '@handbook/components';
import { page } from '@handbook/source';

export const insightViewerPages: HandbookTreeNode = {
  '<InsightViewer>': {
    Basic: page('./InsightViewer/Basic'),
  },
  Annotation: {
    Contour: {
      Viewer: page('./Annotation/Contour/Viewer'),
    },
  },
};
