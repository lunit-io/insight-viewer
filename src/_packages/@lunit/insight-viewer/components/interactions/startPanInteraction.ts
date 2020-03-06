interface PanInteractionParams {
  element: HTMLElement;
  getCurrentViewport: () => cornerstone.Viewport | null;
  onMove: (translation: cornerstone.Vec2) => void;
  onEnd: () => void;
  contentWindow: Window;
}

export function startPanInteraction({
  element,
  getCurrentViewport,
  onMove,
  onEnd,
  contentWindow,
}: PanInteractionParams): () => void {
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

    contentWindow.addEventListener('mousemove', move);
    contentWindow.addEventListener('mouseup', end);
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

    contentWindow.removeEventListener('mousemove', move);
    contentWindow.removeEventListener('mouseup', end);
    element.removeEventListener('mouseleave', end);

    element.addEventListener('mousedown', start);

    onEnd();
  }

  element.addEventListener('mousedown', start);

  return () => {
    element.removeEventListener('mousedown', start);
    contentWindow.removeEventListener('mousemove', move);
    contentWindow.removeEventListener('mouseup', end);
    element.removeEventListener('mouseleave', end);
  };
}
