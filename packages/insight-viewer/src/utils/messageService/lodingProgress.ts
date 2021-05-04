import { Observable, Subject } from 'rxjs'

const subject = new Subject<number>()

export const lodingProgressMessage = {
  sendMessage: (message: number): void => subject.next(message),
  clearMessage: (): void => subject.next(),
  getMessage: (): Observable<number> => subject.asObservable(),
}
