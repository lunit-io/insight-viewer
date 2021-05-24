import { Observable, Subject } from 'rxjs'

export interface ViewportMessageProp {
  key: string
  value: unknown
}

const subject = new Subject<ViewportMessageProp>()

export const viewportMessage = {
  sendMessage: (key: string, value: unknown): void =>
    subject.next({
      key,
      value,
    }),
  getMessage: (): Observable<ViewportMessageProp> => subject.asObservable(),
}
