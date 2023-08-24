import React from "react";
import { Modal, ModalProps } from "../Modal/Modal";

export interface ManagedModalProps extends Partial<Omit<ModalProps, "opened">> {
  children: React.ReactNode;
}

export function useManagedModal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return {
    isOpen, open, close, Modal: (props: ManagedModalProps) => {
      return <Modal opened={isOpen} onClose={close} {...props} />;
    }
  };
}
