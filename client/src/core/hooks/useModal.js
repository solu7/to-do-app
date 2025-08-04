import { useState } from "react";

export const useModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  return { modalIsOpen, openModal, closeModal, toggleModal };
};
