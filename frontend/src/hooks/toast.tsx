import { Toast, ToastMessage } from 'primereact/toast';
import React, { PropsWithChildren, createContext, useCallback, useContext, useRef } from 'react';

interface ToastContextData {
  addToast(message: ToastMessage): void;
}

// export interface ToastMessage {
//   id: string;
//   type?: 'success' | 'error' | 'info' | 'warn',
//   title: string;
//   description?: string,
// }

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const toast = useRef<Toast | null>(null);

  const addToast = useCallback((message: ToastMessage) => {
    if (toast.current) toast.current.show(message);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <Toast ref={toast} />
    </ToastContext.Provider>
  );
}

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
