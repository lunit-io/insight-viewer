import { Vec2, Viewport } from 'cornerstone-core';

interface PanInteractionParams {
  element: HTMLElement;
  getCurrentViewport: () => Viewport | null;
  onMove: (translation: Vec2) => void;
  onEnd: () => void;
}

export function startPanInteraction({ element, getCurrentViewport, onMove, onEnd }: PanInteractionParams): () => void {
  let startPageX: number;
  let startPageY: number;
  let startTranslationX: number;
  let startTranslationY: number;

  function start(event: MouseEvent) {
    if (event.button !== 0) return;

    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    const viewport = getCurrentViewport();
    if (!viewport) return;

    element.removeEventListener('mousedown', start);

    startPageX = event.pageX;
    startPageY = event.pageY;
    startTranslationX = viewport.translation.x;
    startTranslationY = viewport.translation.y;

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
    element.addEventListener('mouseleave', end);
  }

  function move(event: MouseEvent) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    const viewport = getCurrentViewport();
    if (!viewport) return;

    const dx: number = (event.pageX - startPageX) / viewport.scale;
    const dy: number = (event.pageY - startPageY) / viewport.scale;

    onMove({
      x: startTranslationX + dx,
      y: startTranslationY + dy,
    });
  }

  function end(event: MouseEvent) {
    if (event.button !== 0) return;

    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    window.removeEventListener('mousemove', move);
    window.removeEventListener('mouseup', end);
    element.removeEventListener('mouseleave', end);

    element.addEventListener('mousedown', start);

    onEnd();
  }

  element.addEventListener('mousedown', start);

  return () => {
    element.removeEventListener('mousedown', start);
    window.removeEventListener('mousemove', move);
    window.removeEventListener('mouseup', end);
    element.removeEventListener('mouseleave', end);
  };
}
