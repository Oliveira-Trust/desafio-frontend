import { createContext, useContext } from 'react';

type ToastContextParams = {
  open: (message: string, type?: string) => void;
  close: (id: string) => void;
};

export const ToastContext = createContext<ToastContextParams | null>(null);
export const useToast = () => useContext(ToastContext);
