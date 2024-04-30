import React from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  setOpenModal: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, children }: ModalProps) {
  if (isOpen) {
    return (
      <div className={styles.container}>
        <div className={styles.modal}>{children}</div>
      </div>
    );
  }

  return null;
}
