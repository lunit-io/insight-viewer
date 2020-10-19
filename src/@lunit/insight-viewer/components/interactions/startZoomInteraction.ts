import { isTouchDevice } from '@lunit/is-touch-device';
import { easeQuadInOut } from 'd3-ease';
import { timer } from 'd3-timer';

interface ZoomInteractionParams {
  element: HTMLElement;
  getMinMaxScale: () => [number, number];
  getCurrentViewport: () => cornerstone.Viewport | null;
  onZoom: (patch: { translation: cornerstone.Vec2; scale: number }) => void;
  contentWindow: Window;
}

type Point = { x: number; y: number };

export function startZoomInteraction({
  element,
  getMinMaxScale,
  getCurrentViewport,
  onZoom,
  contentWindow,
}: ZoomInteractionParams): () => void {
  // ---------------------------------------------
  // wheel handler
  // ---------------------------------------------
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

  // ---------------------------------------------
  // touch handler
  // ---------------------------------------------
  let startPagePoints: [Point, Point];
  let startPixelDistance: number;

  let startViewportPoint: Point;
  let startViewportScale: number;

  function pinchStart(event: TouchEvent) {
    if (event.targetTouches.length !== 2) return;

    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    const currentViewport = getCurrentViewport();

    if (!currentViewport) return;

    // 시작 시점의 viewport를 기록한다
    startViewportScale = currentViewport.scale;
    startViewportPoint = currentViewport.translation;

    // p1 과 p2를 기록한다
    startPagePoints = [
      { x: event.targetTouches[0].pageX, y: event.targetTouches[0].pageY },
      { x: event.targetTouches[1].pageX, y: event.targetTouches[1].pageY },
    ];

    // p1과  p2의 거리를 측정한다
    const a: number = Math.abs(startPagePoints[0].x - startPagePoints[1].x);
    const b: number = Math.abs(startPagePoints[0].y - startPagePoints[1].y);
    startPixelDistance = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

    element.removeEventListener('touchstart', pinchStart);

    element.addEventListener('touchmove', pinchMove);
    element.addEventListener('touchend', pinchEnd);
    element.addEventListener('touchcancel', pinchEnd);
  }

  function pinchMove(event: TouchEvent) {
    if (event.targetTouches.length !== 2 || event.changedTouches.length !== 2) return;

    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    const pagePoints = [
      { x: event.changedTouches[0].pageX, y: event.changedTouches[0].pageY },
      { x: event.changedTouches[1].pageX, y: event.changedTouches[1].pageY },
    ];
    const a: number = Math.abs(pagePoints[0].x - pagePoints[1].x);
    const b: number = Math.abs(pagePoints[0].y - pagePoints[1].y);
    const pixelDistance: number = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

    // 현재 p1, p2의 거리 / 이전 p1, p2의 거리를 구한다 = 확대비
    // 이전 viewport scale 에 확대비를 곱해서 변동된 viewport scale을 구한다
    const nextViewportScale: number = startViewportScale * (pixelDistance / startPixelDistance);

    // 현재 center point - 이전 center point = center point의 이동량
    // center point의 이동량 * viewport scale = image scale 내에서의 이동량
    const dx: number =
      ((pagePoints[0].x + pagePoints[1].x) / 2 - (startPagePoints[0].x + startPagePoints[1].x) / 2) / nextViewportScale;
    const dy: number =
      ((pagePoints[0].y + pagePoints[1].y) / 2 - (startPagePoints[0].y + startPagePoints[1].y) / 2) / nextViewportScale;

    onZoom({
      translation: {
        x: startViewportPoint.x + dx,
        y: startViewportPoint.y + dy,
      },
      scale: nextViewportScale,
    });
  }

  function pinchEnd(event: TouchEvent) {
    const currentViewport = getCurrentViewport();

    if (!currentViewport) return;

    const [minScale, maxScale] = getMinMaxScale();

    // mili seconds
    const duration = 500;

    if (currentViewport.scale < minScale) {
      const t = timer((elapsed) => {
        // easing 처리된 시간점 (0~1)을 구한다
        const d = easeQuadInOut(elapsed / duration);
        if (elapsed > duration) {
          // 목표 상태로 설정
          onZoom({
            translation: currentViewport.translation,
            scale: minScale,
          });
          t.stop();
        } else {
          // 경과 animation 상태로 설정
          // 시작 viewport scale + ( 목표가 되는 minimum scale - 시작 viewport scale ) * 시간점
          onZoom({
            // FIXME translation에 특별한 처리를 하지 않아서 마지막 이동 위치를 기준으로 움직이는데, 부자연스럽다면 scale에 따른 translation 조정이 필요할 수도 있다
            translation: currentViewport.translation,
            scale: currentViewport.scale + (minScale - currentViewport.scale) * d,
          });
        }
      });
    } else if (currentViewport.scale > maxScale) {
      const t = timer((elapsed) => {
        const d = easeQuadInOut(elapsed / duration);
        if (elapsed > duration) {
          onZoom({
            translation: currentViewport.translation,
            scale: maxScale,
          });
          t.stop();
        } else {
          onZoom({
            translation: currentViewport.translation,
            scale: currentViewport.scale + (maxScale - currentViewport.scale) * d,
          });
        }
      });
    }

    element.removeEventListener('touchmove', pinchMove);
    element.removeEventListener('touchend', pinchEnd);
    element.removeEventListener('touchcancel', pinchEnd);

    element.addEventListener('touchstart', pinchStart);
  }

  // ---------------------------------------------
  // start
  // ---------------------------------------------
  element.addEventListener('wheel', wheel);
  if (isTouchDevice()) {
    element.addEventListener('touchstart', pinchStart);
  }

  // ---------------------------------------------
  // end
  // ---------------------------------------------
  return () => {
    element.removeEventListener('wheel', wheel);
    element.removeEventListener('touchstart', pinchStart);

    element.removeEventListener('touchmove', pinchMove);
    element.removeEventListener('touchend', pinchEnd);
    element.removeEventListener('touchcancel', pinchEnd);
  };
}
