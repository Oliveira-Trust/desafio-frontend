import { X } from "lucide-react";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { ToastContext } from "../../../context/ToastContext";
import "./Toast.css";

type ToastProperties = {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  onClose: () => void;
};

const useTimeout = (callback: () => void) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const id = setTimeout(() => {
      savedCallback.current();
    }, 3000);
    return () => clearTimeout(id);
  }, []);
};

const Toast: React.FC<ToastProperties> = ({ message, type, onClose }) => {
  useTimeout(onClose);
  return (
    <div className={`toast ${type}`}>
      <p>{message}</p>
      <button onClick={onClose}>
        <X />
      </button>
    </div>
  );
};

type ToastProviderProperties = {
  children: React.ReactElement;
};

type ToastType = {
  id: string;
  message: string;
  type?: "success" | "error" | "info" | "warning";
};

export const ToastProvider: React.FC<ToastProviderProperties> = ({
  children,
}: ToastProviderProperties) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const openToast = (message: string, type?: "success" | "error" | "info" | "warning") => {
    const newToast = {
      id: crypto.randomUUID(),
      type,
      message,
    };
    setToasts((previousToasts) => [...previousToasts, newToast]);
  };

  const closeToast = (id: string) => {
    setToasts((previousToasts) =>
      previousToasts.filter((toast) => toast.id !== id)
    );
  };

  const contextValue = useMemo(
    () => ({
      open: openToast,
      close: closeToast,
    }),
    []
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="toasts">
        {toasts.map((toast, index) => (
          <Toast
            key={index}
            message={toast.message}
            type={toast.type}
            onClose={() => closeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
