import { Component, useEffect, useState } from 'react';

export interface WindowFeatures {
  width: number;
  height: number;
}

export interface NewWindowProps<T> {
  url: string;
  value: T;
  features: WindowFeatures | string;
  onOpen?: (window: Window) => void;
  onBlock?: () => void;
  onClose?: () => void;
}

const VALUE: string = '__window_value__';
const UPDATE: string = '__window_value_update__';

export class NewWindow<T> extends Component<NewWindowProps<T>, {}> {
  private windowObject!: Window;
  private intervalId!: number;
  
  render() {
    return null;
  }
  
  close = () => {
    const {onClose} = this.props;
    
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
    const {url, value, features, onOpen, onBlock} = this.props;
    
    const windowObject: Window | null = window.open(url, '_blank', typeof features === 'string' ? features : parseWindowFeatures(features));
    
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
    const {url, value} = this.props;
    
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

function parseWindowFeatures({width, height}: WindowFeatures): string {
  return `width=${width}, height=${height}`;
}

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