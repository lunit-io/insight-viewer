import { Observable, Subject } from 'rxjs'
import { Viewport } from '../../Context/Viewport/types'

export interface ViewportMessageProp<K extends keyof Viewport> {
  key: K
  value: Viewport[K]
}

const subject = new Subject<Partial<Viewport>>()

export const viewportMessage = {
  sendMessage: (message: Partial<Viewport>): void => subject.next(message),
  getMessage: (): Observable<Partial<Viewport>> => subject.asObservable(),
}
