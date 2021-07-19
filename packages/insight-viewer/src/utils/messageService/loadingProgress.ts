import { Observable, Subject } from 'rxjs'

interface Message {
  message: number
  loaded?: boolean
}

const subject = new Subject<Message>()

export const loadingProgressMessage = {
  sendMessage: (message: number, loaded = false): void =>
    subject.next({ message, loaded }),
  getMessage: (): Observable<Message> => subject.asObservable(),
}
