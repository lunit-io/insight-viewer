import { HandbookTreeNode } from '@handbook/components';
import { page } from '@handbook/source';

export const insightViewerPages: HandbookTreeNode = {
  'Getting Started': page('./Basic/Getting-Started'),
  CornerstoneImage: page('./Basic/CornerstoneImage'),
  CornerstoneRenderData: page('./Basic/CornerstoneRenderData'),
  '<DCMImage>': page('./Components/DCMImage'),
  '<InsightViewer>': page('./Components/InsightViewer'),
  '<InsightViewerContainer>': page('./Components/InsightViewerContainer'),
  '<InsightViewerTestController>': page('./Components/InsightViewerTestController'),
  '<StrokeText>': page('./Components/StrokeText'),
  '<ProgressViewer>': page('./Components/ProgressViewer'),
  '<HeatmapViewer>': page('./Components/HeatmapViewer'),
  Contour: page('./Basic/Contour'),
  '<ContourViewer>': page('./Components/ContourViewer'),
  '<ContourDrawer>': page('./Components/ContourDrawer'),
  '<CircleViewer>': page('./Components/CircleViewer'),
  '<CircleDrawer>': page('./Components/CircleDrawer'),
  '<PointViewer>': page('./Components/PointViewer'),
  'useSeriesImagePosition()': page('./Hooks/useSeriesImagePosition'),
  'useSeriesImageScroll()': page('./Hooks/useSeriesImageScroll'),
  'useContour()': page('./Hooks/useContour'),
  'useImageLoadedTime()': page('./Hooks/useImageLoadedTime'),
  'useImageProgress()': page('./Hooks/useImageProgress'),
  'useImageStore()': page('./Hooks/useImageStore'),
  'useInsightViewerSync()': page('./Hooks/useInsightViewerSync'),
  'useViewportMirroring()': page('./Hooks/useViewportMirroring'),
};
