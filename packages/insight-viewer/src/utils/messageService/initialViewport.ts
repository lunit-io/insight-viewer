import { Observable, Subject } from 'rxjs'
import { CornerstoneViewport } from '../cornerstoneHelper'

const subject = new Subject<CornerstoneViewport>()

export const initialViewportMessage = {
  sendMessage: (message: CornerstoneViewport): void => subject.next(message),
  getMessage: (): Observable<CornerstoneViewport> => subject.asObservable(),
}
