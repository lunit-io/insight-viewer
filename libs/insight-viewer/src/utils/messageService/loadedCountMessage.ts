/**
 * @fileoverview Communicate about how many images are loaded for multiframe viewer.
 */
import { Observable, Subject } from 'rxjs'

interface Prop {
  loaded: number
  total: number
}

const subject = new Subject<Prop>()

export const loadedCountMessageMessage = {
  sendMessage: ({ loaded, total }: Prop): void => subject.next({ loaded, total }),
  getMessage: (): Observable<Prop> => subject.asObservable(),
}
