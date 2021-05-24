import { Observable, BehaviorSubject } from 'rxjs'

const subject = new BehaviorSubject<boolean>(true)

export const cornerstoneMessage = {
  sendMessage: (message: boolean): void => subject.next(message),
  getMessage: (): Observable<boolean> => subject.asObservable(),
}
