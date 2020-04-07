interface AdjustInteractionParams {
  element: HTMLElement;
  getCurrentViewport: () => cornerstone.Viewport | null;
  onMove: (voi: cornerstone.VOI) => void;
  onEnd: () => void;
  contentWindow: Window;
}

export function startAdjustInteraction({
  element,
  getCurrentViewport,
  onMove,
  onEnd,
  contentWindow,
}: AdjustInteractionParams): () => void {
  let startPageX: number;
  let startPageY: number;
  let startWindowCenter: number;
  let startWindowWidth: number;

  function startTrigger() {
    element.addEventListener('mousedown', mouseStart);
    element.addEventListener('touchstart', touchStart);
  }

  function stopTrigger() {
    element.removeEventListener('mousedown', mouseStart);
    element.removeEventListener('touchstart', touchStart);
  }

  function touchStart(event: TouchEvent) {
    if (event.targetTouches.length !== 1) return;

    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    const viewport = getCurrentViewport();
    if (!viewport) return;

    stopTrigger();

    startPageX = event.touches[0].pageX;
    startPageY = event.touches[0].pageY;
    startWindowCenter = viewport.voi.windowCenter;
    startWindowWidth = viewport.voi.windowWidth;

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
    }

    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    const viewport = getCurrentViewport();
    if (!viewport) return;

    const dx: number = event.touches[0].pageX - startPageX;
    const dy: number = event.touches[0].pageY - startPageY;

    onMove({
      windowWidth: Math.max(startWindowWidth + dx, 1),
      windowCenter: Math.max(startWindowCenter + dy, 1),
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
    startWindowCenter = viewport.voi.windowCenter;
    startWindowWidth = viewport.voi.windowWidth;

    contentWindow.addEventListener('mousemove', mouseMove);
    contentWindow.addEventListener('mouseup', mouseEnd);
    element.addEventListener('mouseleave', mouseEnd);
  }

  function mouseMove(event: MouseEvent) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    const dx: number = event.pageX - startPageX;
    const dy: number = event.pageY - startPageY;

    onMove({
      windowWidth: Math.max(startWindowWidth + dx, 1),
      windowCenter: Math.max(startWindowCenter + dy, 1),
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
  };
}
