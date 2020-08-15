import { useMemo } from 'react';
import { adjust } from './adjust';
import { pan } from './pan';
import { zoom } from './zoom';

export function useViewerInteractions(
  interactions: ('pan' | 'adjust' | 'zoom' | string)[],
  { element }: { element?: HTMLElement | null } = {},
) {
  return useMemo(
    () => {
      return interactions.map((interactionName) => {
        switch (interactionName) {
          case 'pan':
            return pan({ element });
          case 'adjust':
            return adjust({ element });
          case 'zoom':
            return zoom({ element });
          default:
            return undefined;
        }
      });
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [element, ...interactions],
  );
}
