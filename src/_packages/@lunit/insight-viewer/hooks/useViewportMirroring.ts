import { RefObject, useCallback, useMemo } from 'react';
import { InsightViewer } from '../components/InsightViewer';
import { CornerstoneRenderData } from '../types';

interface ViewportMirroring {
  updateMasterRenderData: (renderData: CornerstoneRenderData) => void;
}

export function useViewportMirroring(...destinations: (InsightViewer | RefObject<InsightViewer>)[]): ViewportMirroring {
  const updateMasterRenderData = useCallback(
    ({ viewport }: CornerstoneRenderData) => {
      const { hflip, vfilip, translation, scale } = viewport;

      for (const dest of destinations) {
        if ('updateViewport' in dest) {
          dest.updateViewport({
            hflip,
            vfilip,
            translation,
            scale,
          });
        } else if ('current' in dest && dest.current) {
          dest.current.updateViewport({
            hflip,
            vfilip,
            translation,
            scale,
          });
        }
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [...destinations],
  );

  return useMemo<ViewportMirroring>(
    () => ({
      updateMasterRenderData,
    }),
    [updateMasterRenderData],
  );
}
