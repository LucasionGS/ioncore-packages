import { IconX } from "@tabler/icons-react";
import { Paper } from "../Paper/Paper";
import "./Modal.css";
import React from "react";

export interface ModalProps {
  children: React.ReactNode;
  onClose: React.MouseEventHandler<HTMLDivElement>;
  opened: boolean;
  closeOnOutsideClick?: boolean;
  transition?: "none" | "pop" | "slide";
  hideCloseButton?: boolean;
}

export function Modal(props: ModalProps) {
  const { opened, onClose, closeOnOutsideClick = false, children, transition = "pop", hideCloseButton = false } = props;
  const classes = ["ic-modal"];
  if (opened) {
    classes.push("ic-modal--opened");
  }
  classes.push(`ic-modal--transition-${transition}`);
  const className = classes.join(" ");
  
  return (
    <div className={className} onClick={e => {
      closeOnOutsideClick && onClose(e);
    }}>
      <Paper className="ic-modal__content" onClick={e => {
        e.stopPropagation();
      }}>
        {!hideCloseButton && <div className="ic-modal__close" onClick={e => {
          onClose(e);
        }}>
          <IconX size={24} />
        </div>}
        {children}
      </Paper>
    </div>
  );
}

