import { BehaviorSubject, Observable } from 'rxjs';

interface Params {
  blob: Blob;
  signal?: AbortSignal;
}

export function fileToBuffer({
  blob,
  signal,
}: Params): Observable<number | ArrayBufferLike> {
  const subject = new BehaviorSubject<number | ArrayBufferLike>(0);

  const reader = new FileReader();

  const abort = () => {
    try {
      reader.abort();
    } catch (error) {}

    signal?.removeEventListener('abort', abort);
  };

  signal?.addEventListener('abort', abort);

  reader.onloadstart = () => {
    subject.next(0);
  };

  reader.onloadend = () => {
    subject.next(reader.result as ArrayBufferLike);

    signal?.removeEventListener('abort', abort);
  };

  reader.onprogress = ({ loaded, lengthComputable, total }: ProgressEvent) => {
    if (lengthComputable) {
      subject.next(loaded / total);
    }
  };

  reader.readAsArrayBuffer(blob);

  return subject.asObservable();
}
