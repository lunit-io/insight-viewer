import { useState } from 'react';
import { CornerstoneRenderData } from '../types';

export interface InsightViewerHostProps {
  updateCornerstoneRenderData: (renderData: CornerstoneRenderData) => void;
}

export interface InsightViewerGuestProps {
  cornerstoneRenderData: CornerstoneRenderData | null;
}

interface InsightViewerSyncProps {
  cornerstoneRenderData: CornerstoneRenderData | null;
  updateCornerstoneRenderData: (eventData: CornerstoneRenderData) => void;
}

export function useInsightViewerSync(): InsightViewerSyncProps {
  const [cornerstoneRenderData, setCornerstoneRenderData] = useState<CornerstoneRenderData | null>(null);

  return {
    cornerstoneRenderData,
    updateCornerstoneRenderData: setCornerstoneRenderData,
  };
}
