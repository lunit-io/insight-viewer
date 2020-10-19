import { isIntersection } from '@lunit/is-intersection';

type Point = [number, number];

/**
 * polygon이 교차점을 가진 complex polygon인지 확인
 * @param polygon Array<[number, number]>
 */
export function isComplexPolygon(polygon: Point[]): boolean {
  // 끝점으로 최초점을 추가해서 닫힌 polygon을 만들어준다
  const closedPolygon: Point[] = [...polygon, polygon[0]];
  const max: number = closedPolygon.length;

  // 0 ->
  let i: number = -1;
  while (++i < max - 2) {
    // i + 1 ->
    // 현재 i 지점의 이전은 검색할 필요가 없기 때문에 i 이후 지점부터 검색한다
    let n: number = i + 2;
    while (++n < max - 1) {
      // line a -> b 와 line c -> d 가 교차하는지 체크한다
      // i 가 point a 가 되고, i + 1 이 point b 가 된다
      // i + 2 가 c, i + 3 이 d가 된다
      // i + 1 -> i + 2 은 i -> i + 1 과 맞닿아있어 교차될 수 없으므로 제외한다
      if (isIntersection(closedPolygon[i], closedPolygon[i + 1], closedPolygon[n], closedPolygon[n + 1])) {
        return true;
      }
    }
  }

  return false;
}
