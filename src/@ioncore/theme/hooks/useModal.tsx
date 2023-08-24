import React from "react";

export function useModal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return { isOpen, open, close };
}
