import { Observable, Subject } from 'rxjs'
import { Viewport } from '../../Context/Viewport/types'

const subject = new Subject<Partial<Viewport>>()

export const viewportMessage = {
  sendMessage: (message: Partial<Viewport>): void => subject.next(message),
  getMessage: (): Observable<Partial<Viewport>> => subject.asObservable(),
}
