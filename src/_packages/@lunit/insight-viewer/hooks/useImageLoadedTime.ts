import { useEffect, useState } from 'react';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function useImageLoadedTime(progresses: Observable<number>[] | null): Date | null {
  const [time, setTime] = useState<Date | null>(null);
  
  useEffect(() => {
    if (progresses) {
      const subscription = combineLatest(progresses)
        .pipe(
          map((numbers: number[]) => numbers.reduce((t, x) => t + x, 0) / numbers.length),
        )
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