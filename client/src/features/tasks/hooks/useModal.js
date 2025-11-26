import { useState } from "react";

export const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(!modalIsOpen);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};
