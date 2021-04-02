import { RefObject, useCallback, useMemo } from 'react';
import { InsightViewer } from '../components/InsightViewer';
import { CornerstoneRenderData, CornerstoneViewerLike } from '../types';

interface ViewportMirroring {
  /** <CornerstoneViewer updateCornerstoneRenderData={}> 에 사용한다 */
  updateMasterRenderData: (renderData: CornerstoneRenderData) => void;
}

/**
 * 여러개의 <CornerstoneViewer>를 동기화 시키기 위해 사용된다
 */
export function useViewportMirroring(
  ...destinations: (
    | InsightViewer
    | RefObject<InsightViewer>
    | CornerstoneViewerLike
    | RefObject<CornerstoneViewerLike>
  )[]
): ViewportMirroring {
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
