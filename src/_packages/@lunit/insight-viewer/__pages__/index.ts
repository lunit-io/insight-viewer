import { HandbookTreeNode } from '@handbook/components';
import { page } from '@handbook/source';

export const insightViewerPages: HandbookTreeNode = {
  'Getting Started': page('./Basic/Getting-Started'),
  '<InsightViewer>': {
    Basic: page('./InsightViewer/Basic'),
  },
  Annotation: {
    Contour: {
      Viewer: page('./Annotation/Contour/Viewer'),
    },
  },
};
