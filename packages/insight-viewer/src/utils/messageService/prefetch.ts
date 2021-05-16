import { Observable, Subject } from 'rxjs'
import { Image } from '../cornerstoneHelper'

const subject = new Subject<Image[]>()

export const prefetchMessage = {
  sendMessage: (message: Image[]): void => subject.next(message),
  getMessage: (): Observable<Image[]> => subject.asObservable(),
}
