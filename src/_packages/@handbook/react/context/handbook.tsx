import { HandbookConfig } from '@handbook/react';
import React, { Consumer, Context, createContext, ReactNode, useContext } from 'react';

export interface HandbookProviderProps extends HandbookConfig {
  children: ReactNode;
}

export interface HandbookState extends HandbookConfig {}

// @ts-ignore
const HandbookContext: Context<HandbookState> = createContext<HandbookState>();

export function HandbookProvider({ children, ...states }: HandbookProviderProps) {
  return <HandbookContext.Provider value={states}>{children}</HandbookContext.Provider>;
}

export function useHandbook(): HandbookState {
  return useContext(HandbookContext);
}

export const HandbookConsumer: Consumer<HandbookState> = HandbookContext.Consumer;
