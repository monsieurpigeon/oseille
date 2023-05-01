import { ComponentProps, PropsWithChildren, createContext, useCallback, useContext, useRef, useState } from 'react';
import { ConfirmDialog } from './ConfirmDialog';

type Params = Partial<Omit<ComponentProps<typeof ConfirmDialog>, 'open' | 'onConfirm' | 'onCancel'>>;

const defaultFunction = (p?: Params) => Promise.resolve(true);

const defaultValue = {
  confirmRef: {
    current: defaultFunction,
  },
};

const ConfirmContext = createContext(defaultValue);

export function ConfirmContextProvider({ children }: PropsWithChildren) {
  const confirmRef = useRef(defaultFunction);

  return (
    <ConfirmContext.Provider value={{ confirmRef }}>
      {children}
      <ConfirmDialogWithContext />
    </ConfirmContext.Provider>
  );
}

function ConfirmDialogWithContext() {
  const [open, setOpen] = useState(false);
  const [props, setProps] = useState<undefined | Params>({});
  const { confirmRef } = useContext(ConfirmContext);
  const resolveRef = useRef((v: boolean) => {});

  confirmRef.current = (props) =>
    new Promise((resolve) => {
      setProps(props);
      setOpen(true);
      resolveRef.current = resolve;
    });

  return (
    <ConfirmDialog
      onConfirm={() => {
        resolveRef.current(true);
        setOpen(false);
      }}
      onCancel={() => {
        resolveRef.current(false);
        setOpen(false);
      }}
      isOpen={open}
      {...props}
    />
  );
}

export function useConfirm() {
  const { confirmRef } = useContext(ConfirmContext);
  return {
    confirm: useCallback(
      (p: Params) => {
        return confirmRef.current(p);
      },
      [confirmRef],
    ),
  };
}
