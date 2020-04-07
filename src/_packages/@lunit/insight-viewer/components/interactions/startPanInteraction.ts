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

  function startTrigger() {
    element.addEventListener('mousedown', mouseStart);
    element.addEventListener('touchstart', touchStart);
  }

  function stopTrigger() {
    element.removeEventListener('mousedown', mouseStart);
    element.removeEventListener('touchstart', touchStart);
  }

  function touchStart(event: TouchEvent) {
    if (event.targetTouches.length > 1) {
      contentWindow.removeEventListener('touchmove', touchMove);
      contentWindow.removeEventListener('touchend', touchEnd);
      contentWindow.removeEventListener('touchcancel', touchEnd);

      startTrigger();

      return;
    }

    if (event.targetTouches.length !== 1) return;

    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    const viewport = getCurrentViewport();
    if (!viewport) return;

    stopTrigger();

    startPageX = event.targetTouches[0].pageX;
    startPageY = event.targetTouches[0].pageY;
    startTranslationX = viewport.translation.x;
    startTranslationY = viewport.translation.y;

    contentWindow.addEventListener('touchmove', touchMove);
    contentWindow.addEventListener('touchend', touchEnd);
    contentWindow.addEventListener('touchcancel', touchEnd);
  }

  function touchMove(event: TouchEvent) {
    if (event.targetTouches.length !== 1 || event.changedTouches.length !== 1) {
      contentWindow.removeEventListener('touchmove', touchMove);
      contentWindow.removeEventListener('touchend', touchEnd);
      contentWindow.removeEventListener('touchcancel', touchEnd);

      startTrigger();

      return;
    }

    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    const viewport = getCurrentViewport();
    if (!viewport) return;

    const dx: number = (event.targetTouches[0].pageX - startPageX) / viewport.scale;
    const dy: number = (event.targetTouches[0].pageY - startPageY) / viewport.scale;

    onMove({
      x: startTranslationX + dx,
      y: startTranslationY + dy,
    });
  }

  function touchEnd(event: TouchEvent) {
    contentWindow.removeEventListener('touchmove', touchMove);
    contentWindow.removeEventListener('touchend', touchEnd);
    contentWindow.removeEventListener('touchcancel', touchEnd);

    startTrigger();

    onEnd();
  }

  function mouseStart(event: MouseEvent) {
    if (event.button !== 0) return;

    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    const viewport = getCurrentViewport();
    if (!viewport) return;

    stopTrigger();

    startPageX = event.pageX;
    startPageY = event.pageY;
    startTranslationX = viewport.translation.x;
    startTranslationY = viewport.translation.y;

    contentWindow.addEventListener('mousemove', mouseMove);
    contentWindow.addEventListener('mouseup', mouseEnd);
    element.addEventListener('mouseleave', mouseEnd);
  }

  function mouseMove(event: MouseEvent) {
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

  function mouseEnd(event: MouseEvent) {
    if (event.button !== 0) return;

    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    contentWindow.removeEventListener('mousemove', mouseMove);
    contentWindow.removeEventListener('mouseup', mouseEnd);
    element.removeEventListener('mouseleave', mouseEnd);

    startTrigger();

    onEnd();
  }

  startTrigger();

  return () => {
    element.removeEventListener('mousedown', mouseStart);
    contentWindow.removeEventListener('mousemove', mouseMove);
    contentWindow.removeEventListener('mouseup', mouseEnd);
    element.removeEventListener('mouseleave', mouseEnd);

    element.removeEventListener('touchstart', touchStart);
    contentWindow.removeEventListener('touchmove', touchMove);
    contentWindow.removeEventListener('touchend', touchEnd);
    contentWindow.removeEventListener('touchcancel', touchEnd);
  };
}
