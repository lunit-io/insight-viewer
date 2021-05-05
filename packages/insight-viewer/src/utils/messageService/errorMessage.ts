import { Observable, Subject } from 'rxjs'

const subject = new Subject<string>()

export const errorMessage = {
  sendMessage: (message: string): void => subject.next(message),
  getMessage: (): Observable<string> => subject.asObservable(),
}
