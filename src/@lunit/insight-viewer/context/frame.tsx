import React, { Context, createContext, ReactNode, useContext } from 'react';

export interface FrameProviderProps {
  children: ReactNode;
  frame?: HTMLIFrameElement;
  contentWindow?: Window;
}

export interface FrameState {
  frame?: HTMLIFrameElement;
  contentWindow: Window;
}

const FrameContext: Context<FrameState> = createContext<FrameState>({
  contentWindow: window,
});

/**
 * `<iframe>` + `React.createPortal()` 이라는 매우 특수한 상황을 위한 기능.
 * 사용할 일은 거의 없다.
 */
export function FrameProvider({
  children,
  contentWindow = window,
}: FrameProviderProps) {
  return (
    <FrameContext.Provider
      value={{
        contentWindow,
      }}
    >
      {children}
    </FrameContext.Provider>
  );
}

export function useFrame(): FrameState {
  return useContext(FrameContext);
}

export function FrameConsumer({
  stateRef,
}: {
  stateRef: (state: FrameState) => void;
}) {
  return (
    <FrameContext.Consumer>
      {(state) => void stateRef(state)}
    </FrameContext.Consumer>
  );
}

//export const InsightViewerConsumer: Consumer<InsightViewerState> = InsightViewerContext.Consumer;
