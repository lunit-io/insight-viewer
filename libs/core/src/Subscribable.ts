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
