import { IconX } from "@tabler/icons-react";
import { Paper } from "../Paper/Paper";
import "./Modal.css";
import React from "react";

export interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  opened: boolean;
  closeOnOutsideClick?: boolean;
}

export function Modal(props: ModalProps) {
  const { opened, onClose, closeOnOutsideClick = false, children } = props;
  if (!opened) {
    return <></>;
  }
  return (
    <div className="modal" onClick={e => {
      closeOnOutsideClick && onClose();
    }}>
      <Paper className="modal__content" onClick={e => {
        e.stopPropagation();
      }}>
        <div className="modal__close" onClick={onClose}>
          <IconX size={24} />
        </div>
        {children}
      </Paper>
    </div>
  );
}

