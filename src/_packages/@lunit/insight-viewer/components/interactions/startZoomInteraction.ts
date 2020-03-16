interface ZoomInteractionParams {
  element: HTMLElement;
  getMinMaxScale: () => [number, number];
  getCurrentViewport: () => cornerstone.Viewport | null;
  onZoom: (patch: { translation: cornerstone.Vec2; scale: number }) => void;
  contentWindow: Window;
}

export function startZoomInteraction({
  element,
  getMinMaxScale,
  getCurrentViewport,
  onZoom,
  contentWindow,
}: ZoomInteractionParams): () => void {
  function wheel(event: WheelEvent) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const [minScale, maxScale] = getMinMaxScale();
    const currentViewport = getCurrentViewport();

    if (!currentViewport) return;

    // deltaY는 scroll up의 경우 negative 수치로 오고,
    // scroll down의 경우 positive 수치로 온다
    // scale의 변환을 정상적인 방향으로 연산하기 위해서는 (scale - delta)로 방향을 전환해줘야 한다
    const delta: number = event.deltaY > 0 ? 1 : -1;

    const nextScale: number = Math.max(
      minScale, // 최소 scale 미만으로 떨어지지 않도록 방지
      Math.min(
        maxScale, // 최대 scale 이상으로 올라가지 않도록 방지
        currentViewport.scale - delta * 0.03, // scale을 delta 수치로 보정
      ),
    );

    // min, max 등에 의해서 scale 변화가 없다면 viewport 반영을 취소
    if (currentViewport.scale === nextScale) return;

    // pageX, pageY 는 screen 기준 mouse pointer의 point
    // bounding rect는 screen 기준 element의 rect
    const { top, left, width, height } = element.getBoundingClientRect();

    // left + width / 2 는 screen 기준 element의 center
    // mouse pointer point - window scroll position 으로 scroll 기준 위치를 찾는다
    // screen 기준 mouse pointer point - element의 center
    // element center 부터의 mouse 상대 위치의 차를 계산하게 된다
    // | ------ center ==== mouse - |   = 로 표시된 거리
    const distanceX: number = event.pageX - contentWindow.scrollX - (left + width / 2);
    const distanceY: number = event.pageY - contentWindow.scrollY - (top + height / 2);

    // nextScale / currentViewport.scale 으로 scale 변화의 비율을 계산 (확대 시 >1, 축소 시 <1)
    // 1 - scale 변환 비율로 확대 / 축소 시 size 변화에 따른 위치 변화의 폭을 찾는다
    // 확대 시 x 위치는 <- 으로 팽창하게 되기 때문에 - 수치가 나오게 되고
    // 축소 시 x 위치는 -> 으로 수축하게 되기 때문에 + 수치가 나오게 된다
    // size 변화의 비율 * distanceX 로 이동해야 할 수치를 계산
    const dx: number = (1 - nextScale / currentViewport.scale) * distanceX;
    const dy: number = (1 - nextScale / currentViewport.scale) * distanceY;

    onZoom({
      // dx / nextScale 로 실제적인 이동 수치를 찾고
      // currentViewport.translation.x + 를 통해서 기존 위치에 이동 수치를 적용한 값을 찾는다
      translation: {
        x: currentViewport.translation.x + dx / nextScale,
        y: currentViewport.translation.y + dy / nextScale,
      },
      scale: nextScale,
    });
  }

  element.addEventListener('wheel', wheel);

  return () => {
    element.removeEventListener('wheel', wheel);
  };
}
