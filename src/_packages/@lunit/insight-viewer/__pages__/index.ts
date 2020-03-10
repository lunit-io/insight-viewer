import { HandbookTreeNode } from '@handbook/components';
import { page } from '@handbook/source';

export const insightViewerPages: HandbookTreeNode = {
  'Getting Started': page('./Basic/Getting-Started'),
  CornerstoneImage: page('./Basic/CornerstoneImage'),
  CornerstoneRenderData: page('./Basic/CornerstoneRenderData'),
  '<InsightViewer>': page('./Components/InsightViewer'),
  '<InsightViewerContainer>': page('./Components/InsightViewerContainer'),
  '<StrokeText>': page('./Components/StrokeText'),
  '<HeatmapViewer>': page('./Components/HeatmapViewer'),
  Contour: page('./Basic/Contour'),
  '<ContourViewer>': page('./Components/ContourViewer'),
};
