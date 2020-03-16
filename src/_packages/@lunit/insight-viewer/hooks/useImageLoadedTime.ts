import { useEffect, useState } from 'react';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Progress가 완료된 시간을 찾기 위해 사용된다.
 *
 * (A. Task 시작)
 * → User가 행동할 수 없는 Image Loading 시간
 * → (B. Image가 로딩되어 Task가 시작된 시간)
 * → Task 진행
 * → (C. Task 완료 시점)
 *
 * User가 Task를 진행한 시간을 좀 더 정확하게 계산하기 위해 사용된다.
 *
 * C - A = User가 행동할 수 없는 Image Loading 시간 때문에 부정확
 * B - A = C - A 보다 좀 더 User가 행동할 수 있는 시간을 기준으로 계산
 *
 * ```ts
 * const progress = useMemo(() => [image.progress], [image]);
 * const imageLoadedTime = useImageLoadedTime(progress);
 * ```
 *
 * 여기서 `imageLoadedTime`은 Image가 최종적으로 Load된 시간이다.
 */
export function useImageLoadedTime(progresses: Observable<number>[] | null): Date | null {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    if (progresses) {
      const subscription = combineLatest(progresses)
        .pipe(map((numbers: number[]) => numbers.reduce((t, x) => t + x, 0) / numbers.length))
        .subscribe(value => {
          if (value >= 1) {
            setTime(new Date());
            subscription.unsubscribe();
          }
        });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [progresses]);

  return time;
}
