import { BehaviorSubject, Observable } from 'rxjs';

interface Params {
  url: string;
  signal?: AbortSignal;
  headers?: Headers | [string, string][] | { [key: string]: string };
}

export function fetchBuffer({
  url,
  signal,
  headers,
}: Params): Observable<number | ArrayBuffer> {
  const subject = new BehaviorSubject<number | ArrayBuffer>(0);

  const xhr: XMLHttpRequest = new XMLHttpRequest();

  xhr.open('get', url, true);
  xhr.responseType = 'arraybuffer';

  if (headers instanceof Headers || Array.isArray(headers)) {
    for (const [k, v] of headers) {
      xhr.setRequestHeader(k, v);
    }
  } else if (headers) {
    Object.keys(headers).forEach((key) => {
      xhr.setRequestHeader(key, headers[key]);
    });
  }

  const abort = () => {
    try {
      xhr.abort();
    } catch (error) {}

    signal?.removeEventListener('abort', abort);
  };

  signal?.addEventListener('abort', abort);

  xhr.onloadstart = () => {
    subject.next(0);
  };

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      subject.next(xhr.response);

      signal?.removeEventListener('abort', abort);
    }
  };

  xhr.onprogress = ({ loaded, lengthComputable, total }: ProgressEvent) => {
    if (lengthComputable) {
      subject.next(loaded / total);
    }
  };

  xhr.send();

  return subject.asObservable();
}
