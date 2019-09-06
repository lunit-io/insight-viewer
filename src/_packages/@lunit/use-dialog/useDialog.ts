import { ReactNode, useCallback, useMemo, useState } from 'react';

type Props<P, R> = P & {
  closeDialog: (returnValue: R) => void;
};

export type OpenDialog<P, R> = (p: P) => Promise<R>;

export type DialogTemplate<P = {}, R = void> = (props: Props<P, R>) => ReactNode;

export function useDialog<P = {}, R = void>(dialogTemplate: DialogTemplate<P, R>): [OpenDialog<P, R>, ReactNode] {
  const [dialogProps, setDialogProps] = useState<Props<P, R> | null>(null);
  
  const openDialog: OpenDialog<P, R> = useCallback(async (props: P) => {
    return new Promise<R>(resolve => {
      setDialogProps({
        ...props,
        closeDialog: (returnValue: R) => {
          resolve(returnValue);
          setDialogProps(null);
        },
      });
    });
  }, []);
  
  const dialog = useMemo<ReactNode>(() => {
    return dialogProps
      ? dialogTemplate(dialogProps)
      : null;
  }, [dialogProps, dialogTemplate]);
  
  return [openDialog, dialog];
}