import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";
import ReactDOM from "react-dom";
import "./../components/shared/modal/Modal.css";

type ModalContextType = {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback((content: ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalContent(null);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isOpen && <Modal onClose={closeModal}>{modalContent}</Modal>}
    </ModalContext.Provider>
  );
};

// Hook interno para acessar o contexto
export const useModal = () => {
  const context = useContext(ModalContext);
  return context;
};

// Componente Modal com Portal
const Modal = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
  const modalRoot = document.getElementById("modal-root") as HTMLElement;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const content = (
    <div className="modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">{children}</div>
    </div>
  );

  return ReactDOM.createPortal(content, modalRoot);
};
