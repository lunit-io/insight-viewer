import type { MappingToolWithKey } from './tools';

type Listener = () => void;

/**
 * Class for useSyncExternalStore for connecting with react
 * useSyncExternalStore Docs: https://react.dev/reference/react/useSyncExternalStore
 */
export abstract class Subscribable<
  TSnapshot,
  KListener extends (...args: unknown[]) => void = Listener
> {
  protected listeners: Set<KListener>;
  protected abstract snapshot: TSnapshot;

  constructor() {
    this.listeners = new Set();
    this.subscribe = this.subscribe.bind(this);
  }

  protected onSubscribe(): void {
    // Do nothing
  }

  protected onUnsubscribe(): void {
    // Do nothing
  }

  /**
   * When the method below is called, it calls the listener to trigger react rerendering.
   * 얘를 외부에서 사용할 수 없게 private 로 변경 필요
   * 현재 ViewerFactory init 에서만 사용하고 있음
   *
   * init 도 여기서 선언하고 내부적으로 emitChange 를 사용하도록 조치가 필요해보임
   * emitChange 는 react 렌더링을 트리거하는 method 이므로
   * 최대한 내부에서 사용하도록 조치가 필요해보임
   *
   * 외부에서 사용할 경우, 예상 외의 렌더링 등 사이드 이펙트 발생 가능성이 매우 높음
   */
  protected emitChange = () => {
    this.setSnapshot();
    this.listeners.forEach((listener) => listener());
  };

  protected setSnapshot = () => {
    // Do nothing
  };

  /** Functions that return elements to be exposed externally from their class */
  getSnapshot = () => {
    return this.snapshot;
  };

  subscribe(listener: KListener): () => void {
    this.listeners.add(listener);

    this.onSubscribe();

    return () => {
      this.listeners.delete(listener);
      this.onUnsubscribe();
    };
  }
}
