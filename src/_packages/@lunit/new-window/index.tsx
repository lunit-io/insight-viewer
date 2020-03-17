import { Component, useEffect, useState } from 'react';

/** window.open() 새 창의 width, height */
export interface WindowFeatures {
  width: number;
  height: number;
}

export interface NewWindowProps<T> {
  /** Window의 URL */
  url: string;

  /** Window로 전달할 Data */
  value: T;

  /** window.open() 의 3번째 인자로 전달되는 features */
  features: WindowFeatures | string;

  /** Window가 열렸을때 */
  onOpen?: (window: Window) => void;

  /** Window가 닫혔을때 */
  onClose?: () => void;

  /** Window를 열려고 했지만, Browser Pop-up 제한에 막혔을때 */
  onBlock?: () => void;
}

const VALUE: string = '__window_value__';
const UPDATE: string = '__window_value_update__';

/**
 * Window를 연다
 */
export class NewWindow<T> extends Component<NewWindowProps<T>, {}> {
  private windowObject!: Window;
  private intervalId!: number;

  render() {
    return null;
  }

  close = () => {
    const { onClose } = this.props;

    if (typeof onClose === 'function') {
      onClose();
    }

    clearInterval(this.intervalId);
    this.windowObject.removeEventListener('close', this.close);
    window.removeEventListener('beforeunload', this.close);

    if (!this.windowObject.closed) {
      this.windowObject.close();
    }
  };

  componentDidMount() {
    const { url, value, features, onOpen, onBlock } = this.props;

    const windowObject: Window | null = window.open(
      url,
      '_blank',
      typeof features === 'string' ? features : `width=${features.width}, height=${features.height}`,
    );

    if (windowObject) {
      if (typeof onOpen === 'function') {
        onOpen(windowObject);
      }
      this.windowObject = windowObject;
      windowObject[VALUE] = value;
      windowObject.addEventListener('close', this.close);
      window.addEventListener('beforeunload', this.close);
      this.intervalId = setInterval(() => {
        if (this.windowObject.closed) {
          this.close();
        }
      }, 100);
    } else {
      if (typeof onBlock === 'function') {
        onBlock();
      }
    }
  }

  componentDidUpdate(prevProps: Readonly<NewWindowProps<T>>) {
    const { url, value } = this.props;

    if (prevProps.url !== url) {
      this.windowObject.history.pushState({}, '', url);
    }

    if (prevProps.value !== value) {
      this.windowObject[VALUE] = value;
      this.windowObject.dispatchEvent(new Event(UPDATE));
    }
  }

  componentWillUnmount() {
    this.close();
  }
}

/**
 * Window에서 <NewWindow value={}/> 로 넣어진 Data를 받는다
 */
export function useWindowValue<T>(): T | undefined {
  const [value, setValue] = useState<T | undefined>(() => {
    return window[VALUE];
  });

  useEffect(() => {
    function callback() {
      setValue(window[VALUE]);
    }

    window.addEventListener(UPDATE, callback);

    return () => {
      window.removeEventListener(UPDATE, callback);
    };
  }, []);

  return value;
}
