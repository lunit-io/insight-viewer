import { HandbookTreeNode } from '@handbook/components';
import { page } from '@handbook/source';

export const insightViewerPages: HandbookTreeNode = {
  'Getting Started': page('./Basic/Getting-Started'),
  CornerstoneImage: page('./Basic/CornerstoneImage'),
  CornerstoneRenderData: page('./Basic/CornerstoneRenderData'),
  '<InsightViewer>': {
    Basic: page('./InsightViewer/Basic'),
  },
  Annotation: {
    Contour: {
      Viewer: page('./Annotation/Contour/Viewer'),
    },
  },
};
