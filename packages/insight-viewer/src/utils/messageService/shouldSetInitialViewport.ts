import { Observable, Subject } from 'rxjs'

const subject = new Subject<boolean>()

export const shouldSetInitialViewportMessage = {
  sendMessage: (message: boolean): void => subject.next(message),
  getMessage: (): Observable<boolean> => subject.asObservable(),
}
